'use strict';

const onmlStringify = require('onml/lib/stringify.js');
const w3 = require('./w3.js');

function jsonMlParse(arr) {
    arr[1].xmlns = w3.svg;
    arr[1]['xmlns:xlink'] = w3.xlink;
    const s1 = onmlStringify(arr);
    const s2 = s1.replace(/&/g, '&amp;');
    const parser = new DOMParser();
    const doc = parser.parseFromString(s2, 'image/svg+xml');
    return doc.firstChild;
}

module.exports = jsonMlParse;