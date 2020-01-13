'use strict';

const renderAny = require('./render-any.js');
const jsonmlParse = require('./create-element');

function renderWaveElement(source, outputElement) {
    if (!outputElement || !outputElement.childNodes) {
        return;
    }
    // cleanup
    while (outputElement.childNodes.length) {
        outputElement.removeChild(outputElement.childNodes[0]);
    }

    const renderedSvg = renderAny(0, source);
    outputElement.insertBefore(jsonmlParse(renderedSvg), null);
}

module.exports = renderWaveElement;
