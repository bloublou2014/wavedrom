'use strict';

const pkg = require('../package.json');
const processAll = require('./process-all');
const eva = require('./eva');
const renderWaveForm = require('./render-wave-form');
const renderWaveElement = require('./render-wave-element');
const renderAny = require('./render-any.js');
const editorRefresh = require('./editor-refresh');
// const defaultSkin = require('../skins/default.js');
const narrowSkin = require('../skins/narrow.js');
const onmlStringify = require('onml/lib/stringify.js');

const WaveSkin = narrowSkin.narrow;
const WaveDrom = {
    version: pkg.version,
    processAll: processAll,
    eva: eva,
    renderAny: renderAny,
    renderWaveForm: renderWaveForm,
    renderWaveElement: renderWaveElement,
    editorRefresh: editorRefresh,
    waveSkin: WaveSkin,
    onml: {
        stringify: onmlStringify
    }
};
module.exports = WaveDrom;
window.WaveDrom = WaveDrom;
window.WaveSkin = WaveSkin;