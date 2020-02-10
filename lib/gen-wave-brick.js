'use strict';
const _ = require('lodash');

const genBrick = require('./gen-brick');
// region letters to svg's ids

// Clocks : letter provides a full length
const clocks = {p: 'pclk', n: 'nclk', P: 'Pclk', N: 'Nclk', h: 'pclk', l: 'nclk', H: 'Pclk', L: 'Nclk'};

const x2 = {
    'a': 'a',
    'b': 'b',
    '0': '0', '1': '1',
    'x': 'x',
    'd': 'd',
    'u': 'u',
    'z': 'z',
    '=': 'v', '2': 'v', '3': 'v', '4': 'v', '5': 'v', '6': 'v', '7': 'v', '8': 'v', '9': 'v'
};

const x3 = {
    '0': '', '1': '',
    'a': '',
    'b': '',
    'x': '',
    'd': '',
    'u': '',
    'z': '',
    '=': '-2', '2': '-2', '3': '-3', '4': '-4', '5': '-5', '6': '-6', '7': '-7', '8': '-8', '9': '-9'
};

const y1 = {
    'p': '0', 'n': '1',
    'P': '0', 'N': '1',
    'h': '1', 'l': '0',
    'H': '1', 'L': '0',
    '0': '0', '1': '1',
    'x': 'x',
    'd': 'd',
    'u': 'u',
    'z': 'z',
    'a': 'a',
    'b': 'b',
    '=': 'v', '2': 'v', '3': 'v', '4': 'v', '5': 'v', '6': 'v', '7': 'v', '8': 'v', '9': 'v'
};

const y2 = {
    'p': '', 'n': '',
    'P': '', 'N': '',
    'h': '', 'l': '',
    'H': '', 'L': '',
    '0': '', '1': '',
    'x': '',
    'd': '',
    'u': '',
    'z': '',
    'a': '',
    'b': '',
    '=': '-2', '2': '-2', '3': '-3', '4': '-4', '5': '-5', '6': '-6', '7': '-7', '8': '-8', '9': '-9'
};

// second part of the 40 pixel
const x4 = {
    'a': '111',
    'b': '111',
    'p': '111',
    'n': '000',
    'P': '111',
    'N': '000',
    'h': '111',
    'l': '000',
    'H': '111',
    'L': '000',
    '0': '000',
    '1': '111',
    'x': 'xxx',
    'd': 'ddd',
    'u': 'uuu',
    'z': 'zzz',
    '=': 'vvv-2',
    '2': 'vvv-2',
    '3': 'vvv-3',
    '4': 'vvv-4',
    '5': 'vvv-5',
    '6': 'vvv-6',
    '7': 'vvv-7',
    '8': 'vvv-8',
    '9': 'vvv-9'
};

const x5 = {
    p: 'nclk', n: 'pclk', P: 'nclk', N: 'pclk'
};

const x6 = {
    p: '000', n: '111', P: '000', N: '111'
};

const xclude = {
    'hp': '111', 'Hp': '111', 'ln': '000', 'Ln': '000', 'nh': '111', 'Nh': '111', 'pl': '000', 'Pl': '000'
};

// endregion

/**
 *
 * @param text
 * @param extra
 * @param times
 * @returns {*}
 */
function genWaveBrick(text, extra, times) {
    let atext, tmp0, tmp2, tmp3, tmp4;
    atext = text.split('');
    //if (atext.length !== 2) { return genBrick(['xxx'], extra, times); }
    const elt = atext[1];
    tmp0 = x4[elt];
    let tmp1 = clocks[elt];
    if (!tmp1) {
        tmp2 = x2[elt];
        if (tmp2 === undefined) {
            // unknown
            return genBrick(['xxx'], extra, times);
        }
        tmp3 = y1[atext[0]];
        if (tmp3 === undefined) {
            // unknown
            return genBrick(['xxx'], extra, times);
        }
        // soft curves
        const curve = [tmp3 + 'm' + tmp2 + y2[atext[0]] + x3[elt], tmp0];
        return genBrick(curve, extra, times);
    }
    tmp4 = xclude[text];
    if (tmp4 !== undefined) {
        tmp1 = tmp4;
    }
    // sharp curves
    tmp2 = x5[elt];
    if (tmp2 === undefined) {
        // hlHL
        return genBrick([tmp1, tmp0], extra, times);
    }
    // pnPN
    return genBrick([tmp1, tmp0, tmp2, x6[elt]], extra, times);
}

module.exports = genWaveBrick;
