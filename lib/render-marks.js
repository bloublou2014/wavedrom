'use strict';

const tspan = require('tspan');

function captext (cxt, anchor, y) {
    if (cxt[anchor] && cxt[anchor].text) {
        return [
            ['text', {
                x: cxt.xmax * cxt.xs / 2,
                y: y,
                fill: '#000',
                'text-anchor': 'middle',
                'xml:space': 'preserve'
            }].concat(tspan.parse(cxt[anchor].text))
        ];
    }
    return [];
}

function ticktock (cxt, ref1, ref2, x, dx, y, len) {
    let step = 1;
    let offset;
    let dp = 0;
    let val;
    let L = [];
    let tmp;
    let i;

    if (cxt[ref1] === undefined || cxt[ref1][ref2] === undefined) { return []; }
    val = cxt[ref1][ref2];
    if (typeof val === 'string') {
        val = val.trim().split(/\s+/);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
        offset = Number(val);
        val = [];
        for (i = 0; i < len; i += 1) {
            val.push(i + offset);
        }
    }
    if (Object.prototype.toString.call(val) === '[object Array]') {
        if (val.length === 0) {
            return [];
        } else if (val.length === 1) {
            offset = Number(val[0]);
            if (isNaN(offset)) {
                L = val;
            } else {
                for (i = 0; i < len; i += 1) {
                    L[i] = i + offset;
                }
            }
        } else if (val.length === 2) {
            offset = Number(val[0]);
            step   = Number(val[1]);
            tmp = val[1].split('.');
            if ( tmp.length === 2 ) {
                dp = tmp[1].length;
            }
            if (isNaN(offset) || isNaN(step)) {
                L = val;
            } else {
                offset = step * offset;
                for (i = 0; i < len; i += 1) {
                    L[i] = (step * i + offset).toFixed(dp);
                }
            }
        } else {
            L = val;
        }
    } else {
        return [];
    }

    const res = ['g', {
        class: 'muted',
        'text-anchor': 'middle',
        'xml:space': 'preserve'
    }];

    for (i = 0; i < len; i += 1) {
        res.push(['text', {x: i * dx + x, y: y}].concat(tspan.parse(L[i])));
    }
    return [res];
}

function renderMarks (content, index, lane, source) {
    const mstep = 2 * (lane.hscale);
    const mmstep = mstep * lane.xs;
    const marks = lane.xmax / mstep;
    const gy = content.length * lane.yo;

    let i;
    let res = ['g', {id: ('gmarks_' + index)}];
    const gmarkLines = ['g', {style: 'stroke:#888;stroke-width:0.5;stroke-dasharray:1,3'}];
    if (!(source && source.config && source.config.marks === false)) {
        for (i = 0; i < (marks + 1); i += 1) {
            gmarkLines.push(['line', {
                id: 'gmark_' + i + '_' + index,
                x1: i * mmstep, y1: 0,
                x2: i * mmstep, y2: gy
            }]);
        }
        res = res.concat([gmarkLines]);
    }
    return res
        .concat(captext(lane, 'head', (lane.yh0 ? -33 : -13)))
        .concat(captext(lane, 'foot', gy + (lane.yf0 ? 45 : 25)))
        .concat(ticktock(lane, 'head', 'tick',          0, mmstep,      -5, marks + 1))
        .concat(ticktock(lane, 'head', 'tock', mmstep / 2, mmstep,      -5, marks))
        .concat(ticktock(lane, 'foot', 'tick',          0, mmstep, gy + 15, marks + 1))
        .concat(ticktock(lane, 'foot', 'tock', mmstep / 2, mmstep, gy + 15, marks));
}

module.exports = renderMarks;
