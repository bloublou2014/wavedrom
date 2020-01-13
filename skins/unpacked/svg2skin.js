'use strict';
// Convert SVG unpacked skin version to skin file
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const {parse} = require('svgson');
const CleanCSS = require('clean-css');
const Mustache = require('mustache');
const json5 = require('json5');


// region constants
const skinTpl = fs.readFileSync(path.join(__dirname, 'skin.mustache'), 'utf8');
const defaultCss = fs.readFileSync(path.join(__dirname, 'common.css'), 'utf8');
const defaultArrows = {
    arrowhead: {type: 'marker', 'style': 'fill:#0041c4', 'markerHeight': '7', 'markerWidth': '10', 'markerUnits': 'strokeWidth', 'viewBox': '0 -4 11 8', 'refX': '15', 'refY': '0', 'orient': 'auto', svg: [['path', {'d': 'M0 -4 11 0 0 4z'}]]},
    arrowtail: {type: 'marker', 'style': 'fill:#0041c4', 'markerHeight': '7', 'markerWidth': '10', 'markerUnits': 'strokeWidth', 'viewBox': '-11 -4 11 8', 'refX': '-15', 'refY': '0', 'orient': 'auto', svg: [['path', {'d': 'M0 -4 -11 0 0 4z'}]]}
};
// endregion

// region SVG Conversion
function convertSvg(json) {
    const converted = {};
    const cssClasses = [];
    _.each(json.children, element => {
        const res = convertSvgElement(element, cssClasses);
        if (!res) {
            return;
        }
        converted[res.id] = res.item;
    });
    // add defaults
    _.each(defaultArrows, (element, id) => {
        converted[id] = element;
    });
    return {converted: converted, cssClasses: cssClasses};
}

function convertSvgElement(element, cssClasses) {
    const attrs = element.attributes;
    if (['g', 'rect'].indexOf(element.name) < 0 || !_.has(attrs, 'id')) {
        return;
    }
    const children = element.children;
    const item = {
        type: element.name,
        svg: convertChildrenSvg(attrs.id, cssClasses, children)
    };
    if (attrs.id === 'socket') {
        const first = children[0];
        item.size = {
            x: first.attributes.x,
            y: first.attributes.y,
            height: first.attributes.height,
            width: first.attributes.width
        };
    }
    return {id: attrs.id, item: item};
}

function getCssClass(cssClasses, css) {
    let index = cssClasses.indexOf(css);
    if (index < 0) {
        index = cssClasses.length;
        cssClasses.push(css);
    }
    return 's' + index;
}

function convertChildrenSvg(id, cssClasses, children) {
    const childrenSvg = [];
    _.each(children, (svgItem, i) => {
        const attrsItem = svgItem.attributes;
        if (!_.has(attrsItem, 'd')) {
            return;
        }
        const res = {'d': attrsItem.d};
        if (_.has(attrsItem, 'style')) {
            res.class = getCssClass(cssClasses, attrsItem.style);
        }
        childrenSvg.push([svgItem.name, res]);
    });
    return childrenSvg;
}

// endregion

// region Css optimization

// optimize CSS classes to use the same classes for different svg element classes
// avoiding using 's[1-9]' format > stick to the svg element's id to quickly find them back
function optimizeCssClasses(cssClasses) {
    // reverse dict
    const fullCss = _.map(cssClasses, (css, id) => {
        return '.s' + id + ' {' + css + '}';
    }).join('\n');
    // reverse cssClasses => same classes will fall to the same bucket
    return new CleanCSS({format: 'beautify'}).minify(defaultCss + '\n' + fullCss);
}

// endregion

// stringify with '
function stringify(element) {
    const res = json5.stringify(element, {
        quote: '\''
    });
    return res.replace(/},{/g, '}, {');
}

const unpackedSkinDirectory = path.join(__dirname, 'skins');
const skinFiles = fs.readdirSync(unpackedSkinDirectory);
_.each(skinFiles, filename => {
    const svgContent = fs.readFileSync(path.join(unpackedSkinDirectory, filename), 'utf8').toString();
    parse(svgContent)
        .then(json => {
            // convert svg to id:converted, and cssClasses
            return convertSvg(json);
        })
        .then(res => {
            // generate file content
            const css = optimizeCssClasses(res.cssClasses);
            const name = path.parse(filename).name;
            const converted = res.converted;
            // format quickly defs
            let defs = _.map(converted, (element, id) => {
                return {id: id, value: stringify(element)};
            });
            defs = _.orderBy(defs, ['id'], ['asc']);
            const info = {
                name: name,
                socketSize: converted.socket ? stringify(converted.socket.size) : undefined,
                defs: defs
            };
            const skin = Mustache.render(skinTpl, info);
            return {name: name, css: css, skin: skin};
        })
        .then(res => {
            // write files
            const skinDirectory = path.join(__dirname, '..');
            const cssFilename = path.join(skinDirectory, res.name + '.css');
            const skinFilename = path.join(skinDirectory, res.name + '.js');
            fs.writeFileSync(cssFilename, res.css.styles);
            fs.writeFileSync(skinFilename, res.skin);
        });
});
