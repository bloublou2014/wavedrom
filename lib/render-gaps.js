'use strict';

const _ = require('lodash');

function renderGapUses(text, lane) {
    const res = [];
    const Stack = (text || '').split('');
    let pos = 0;
    let next;
    let subCycle = false;
    while (Stack.length) {
        next = Stack.shift();
        if (next === '<') { // sub-cycles on
            subCycle = true;
            next = Stack.shift();
        }
        if (next === '>') { // sub-cycles off
            subCycle = false;
            next = Stack.shift();
        }
        if (subCycle) {
            pos += 1;
        } else {
            pos += (2 * lane.period);
        }
        if (next === '|') {
            res.push(['use', {
                'xlink:href': '#gap',
                transform: 'translate(' + (lane.xs * ((pos - (subCycle ? 0 : lane.period)) * lane.hscale - lane.phase)) + ')'
            }]);
        }
    }
    return res;
}

function renderGaps(source, index, lane) {
    let i, gaps;

    let res = [];
    if (source) {
        _.each(source, element => {
            lane.period = element.period ? element.period : 1;
            lane.phase = (element.phase ? element.phase * 2 : 0) + lane.xmin_cfg;

            gaps = renderGapUses(element.wave, lane);
            res = res.concat([['g', {
                id: 'wavegap_' + i + '_' + index,
                transform: 'translate(0,' + (lane.y0 + i * lane.yo) + ')'
            }].concat(gaps)]);
        });
    }
    return ['g', {id: 'wavegaps_' + index}].concat(res);
}

module.exports = renderGaps;
