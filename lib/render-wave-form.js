'use strict';

const renderWaveElement = require('./render-wave-element');

function renderWaveForm(source, outputElementId) {
    renderWaveElement(source, document.getElementById(outputElementId), window.WaveSkin);
}

module.exports = renderWaveForm;
