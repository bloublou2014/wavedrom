'use strict';

const tspan = require('tspan');
const textWidth = require('./text-width.js');

function renderLabel(p, text) {
    const w = textWidth(text, 8) + 2;
    return [
        'g',
        {transform: 'translate(' + p.x + ',' + p.y + ')'},
        ['rect', {
            x: -(w >> 1),
            y: -5,
            width: w,
            height: 10,
            style: 'fill:#FFF;'
        }],
        ['text', {
            'text-anchor': 'middle',
            y: 3,
            style: 'font-size:8px;'
        }].concat(tspan.parse(text))
    ];
}

module.exports = renderLabel;
