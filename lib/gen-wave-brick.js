'use strict';
const _ = require('lodash');

const genBrick = require('./gen-brick');
// region letters to svg's ids


const nextBrick = {
    'a': 'a',
    'b': 'b',
    'c': 'c',
    '0': '0', '1': '1',
    'x': 'x',
    'd': 'd',
    'u': 'u',
    'z': 'z',
    '=': 'v', '2': 'v', '3': 'v', '4': 'v', '5': 'v', '6': 'v', '7': 'v', '8': 'v', '9': 'v'
};

const additionalBricks = {
    '0': '', '1': '',
    'a': '',
    'b': '',
    'c': '',
    'x': '',
    'd': '',
    'u': '',
    'z': '',
    '=': '-2', '2': '-2', '3': '-3', '4': '-4', '5': '-5', '6': '-6', '7': '-7', '8': '-8', '9': '-9'
};

const previousBrick = {
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
    'c': 'c',
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
    'c': '',
    '=': '-2', '2': '-2', '3': '-3', '4': '-4', '5': '-5', '6': '-6', '7': '-7', '8': '-8', '9': '-9'
};

const reversed1Bricks = {
    '1mb': 'bm0',
    '1ma': 'am0',
    '1mc': 'cm0',
    'am1': '111',
    'bm1': '111',
    'cm1': '111'
};

// second part of the 40 pixel
const complementaryBricks = {
    'a': '111',
    'b': '111',
    'c': '111',
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

// region Clocks
// Clocks : letter provides a full length
const clocks = {p: 'pclk', n: 'nclk', P: 'Pclk', N: 'Nclk', h: 'pclk', l: 'nclk', H: 'Pclk', L: 'Nclk'};

const x5Clocks = {p: 'nclk', n: 'pclk', P: 'nclk', N: 'pclk'};

const x6Clocks = {p: '000', n: '111', P: '000', N: '111'};

const clockReplacement = {'hp': '111', 'Hp': '111', 'ln': '000', 'Ln': '000', 'nh': '111', 'Nh': '111', 'pl': '000', 'Pl': '000'};
// endregion

// endregion

function genClockBrick(text, extra, times) {
    let clock = clocks[text[1]];
    if (!clock) {
        return;
    }
    const from = text[1];
    const tmp1 = clockReplacement[text] || clocks[from];
    const tmp0 = complementaryBricks[from];
    // sharp curves
    const tmp2 = x5Clocks[from];
    const bricks = tmp2
        ? [tmp1, tmp0] // hlHL
        : [tmp1, tmp0, tmp2, x6Clocks[from]]; // pnPN
    return genBrick(bricks, extra, times);
}

function genCommonBrick(text, extra, times) {
    let tmp0, tmp2, tmp3;
    let elt = text[1];
    const previous = text[0];

    tmp0 = complementaryBricks[elt];
    console.log('gen elt', elt, text, tmp0);
    tmp2 = nextBrick[elt];
    tmp3 = previousBrick[previous];
    if (tmp2 === undefined || tmp3 === undefined) {
        // unknown
        return genBrick(['xxx'], extra, times);
    }
    // soft curves
    let brick = tmp3 + 'm' + tmp2;
    let reversedBrick = reversed1Bricks[brick];
    if (reversedBrick) {
        brick = reversedBrick;
        elt = reversedBrick[2];
        tmp0 = complementaryBricks[elt];
    }
    const curve = [brick + y2[previous] + additionalBricks[elt], tmp0];
    console.log('gen curve', curve);
    return genBrick(curve, extra, times);
}


/**
 *
 * @param text
 * @param extra
 * @param times
 * @returns {*}
 */
function genWaveBrick(text, extra, times) {
    return genClockBrick(text, extra, times) || genCommonBrick(text, extra, times);
}

module.exports = genWaveBrick;
