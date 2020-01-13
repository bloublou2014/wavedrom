'use strict';

const renderAssign = require('./render-assign.js');
const renderReg = require('./render-reg.js');
const renderSignal = require('./render-signal.js');

function renderAny(index, source) {
    let res;
    if (source.signal) {
        res = renderSignal(index, source);
    } else if (source.assign) {
        res = renderAssign(index, source);
    } else if (source.reg) {
        res = renderReg(index, source);
    } else {
        res = ['div', {}];
    }
    res[1].class = 'WaveDrom';
    return res;
}

module.exports = renderAny;
