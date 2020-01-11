'use strict';

const renderAny = require('./render-any.js');
const jsonmlParse = require('./create-element');

function renderWaveElement(index, source, outputElement, waveSkin) {

    // cleanup
    while (outputElement.childNodes.length) {
        outputElement.removeChild(outputElement.childNodes[0]);
    }

    outputElement.insertBefore(jsonmlParse(
        renderAny(index, source, waveSkin)
    ), null);
}

module.exports = renderWaveElement;
