'use strict';
const _ = require('lodash');

function rec(tmp, state) {
    state = state || {x: 0, y: 0, xmax: 0, width: [], lanes: [], groups: []};
    const delta = {'x': 10};
    const typeOfFirst = typeof tmp[0];
    let name;
    if (typeOfFirst === 'string' || typeOfFirst === 'number') {
        name = tmp[0];
        delta.x = 25;
    }
    state.x += delta.x;
    const old = {};
    _.each(_.filter(tmp, element => typeof element === 'object'), element => {
        if (Object.prototype.toString.call(element) === '[object Array]') {
            old.y = state.y;
            state = rec(element, state);
            state.groups.push({
                x: state.xx, y: old.y, height: (state.y - old.y), name: state.name
            });
        } else {
            state.lanes.push(element);
            state.width.push(state.x);
            state.y += 1;
        }
    });
    state.xx = state.x;
    state.x -= delta.x;
    state.name = name;
    return state;
}

module.exports = rec;
