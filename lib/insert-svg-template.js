'use strict';

const w3 = require('./w3');
const _ = require('lodash');

function initSkinSvg(skin, svg) {
    if (skin.css) {
        svg.push(['style', {'type': 'text/css'}, skin.css]);
    }
    if (skin.defs) {
        const defsSvg = ['defs'];
        _.each(skin.defs, (def, name) => {
            const properties = def;
            const s = def.svg;
            properties.svg = undefined;
            properties.id = name;
            const tmp = _.concat([def.type, properties], s);
            defsSvg.push(tmp);
        });
        svg.push(defsSvg);
    }
}

function generateSvg(skin, head, body) {
    const svg = [
        'svg',
        _.defaults(head || {}, {id: 'svg', xmlns: w3.svg, 'xmlns:xlink': w3.xlink, height: 0})
    ];
    initSkinSvg(skin, svg);
    if (body) {
        svg.push(body);
    }
    return svg;
}

function insertSVGTemplate(index, source, lane, skin, content, lanes, groups) {
    const width = (lane.xg + (lane.xs * (lane.xmax + 1)));
    const height = (content.length * lane.yo + lane.yh0 + lane.yh1 + lane.yf0 + lane.yf1);

    const head = {
        id: 'svgcontent_' + index,
        height: height,
        width: width,
        viewBox: '0 0 ' + width + ' ' + height,
        overflow: 'hidden'
    };

    const body = [
        // waves
        'g', {id: 'waves_' + index},
        // lanes
        ['g', {
            id: 'lanes_' + index,
            transform: 'translate(' + (lane.xg + 0.5) + ', ' + ((lane.yh0 + lane.yh1) + 0.5) + ')'
        }].concat(lanes),
        // groups
        ['g', {
            id: 'groups_' + index
        }, groups]
    ];

    return generateSvg((index === 0 ? skin : undefined), head, body);
}

module.exports = insertSVGTemplate;
