'use strict';

const genBrick = require('./gen-brick');

function genFirstWaveBrickClock(text, extra, times) {
    switch (text) {
    case 'p':
        return genBrick(['pclk', '111', 'nclk', '000'], extra, times);
    case 'q':
        return genBrick(['pclk', '111111', 'nclk', '000000'], extra, times);
    case 'n':
        return genBrick(['nclk', '000', 'pclk', '111'], extra, times);
    case 'P':
        return genBrick(['Pclk', '111', 'nclk', '000'], extra, times);
    case 'Q':
        return genBrick(['Pclk', '111111', 'nclk', '000000'], extra, times);
    case 'N':
        return genBrick(['Nclk', '000', 'pclk', '111'], extra, times);
    default:
        return undefined;
    }
}

function genFirstWaveBrickVVV(text, extra, times) {
    switch (text) {
    case '=':
        return genBrick(['vvv-2'], extra, times);
    case '2':
        return genBrick(['vvv-2'], extra, times);
    case '3':
        return genBrick(['vvv-3'], extra, times);
    case '4':
        return genBrick(['vvv-4'], extra, times);
    case '5':
        return genBrick(['vvv-5'], extra, times);
    case '6':
        return genBrick(['vvv-6'], extra, times);
    case '7':
        return genBrick(['vvv-7'], extra, times);
    case '8':
        return genBrick(['vvv-8'], extra, times);
    case '9':
        return genBrick(['vvv-9'], extra, times);
    default:
        return undefined;
    }
}

function genFirstWaveBrickCommon(text, extra, times) {
    switch (text) {
    case 'l':
    case 'L':
    case '0':
        return genBrick(['000'], extra, times);
    case 'h':
    case 'H':
    case '1':
        return genBrick(['111'], extra, times);
    case 'd':
        return genBrick(['ddd'], extra, times);
    case 'u':
        return genBrick(['uuu'], extra, times);
    case 'z':
        return genBrick(['zzz'], extra, times);
    default:
        return genBrick(['xxx'], extra, times);
    }
}

function genFirstWaveBrick(text, extra, times) {
    return genFirstWaveBrickClock(text, extra, times)
        || genFirstWaveBrickVVV(text, extra, times)
        || genFirstWaveBrickCommon(text, extra, times);
}

module.exports = genFirstWaveBrick;
