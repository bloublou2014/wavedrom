'use strict';

function genBrick(texts, extra, times) {
    let i, j;
    const r = [];

    if (texts.length === 4) {
        for (j = 0; j < times; j += 1) {
            r.push(texts[0]);
            for (i = 0; i < extra; i += 1) {
                r.push(texts[1]);
            }
            r.push(texts[2]);
            for (i = 0; i < extra; i += 1) {
                r.push(texts[3]);
            }
        }
        return r;
    }
    if (texts.length === 1) {
        texts.push(texts[0]);
    }
    r.push(texts[0]);
    for (i = 0; i < (times * (2 * (extra + 1)) - 1); i += 1) {
        r.push(texts[1]);
    }
    return r;
}

module.exports = genBrick;
