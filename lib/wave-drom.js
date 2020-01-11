'use strict';

window.WaveDrom = window.WaveDrom || {};

const pkg = require('../package.json');
const processAll = require('./process-all');
const eva = require('./eva');
const renderWaveForm = require('./render-wave-form');
const editorRefresh = require('./editor-refresh');
const skins = require('./skins');

window.WaveDrom.processAll = processAll;
window.WaveDrom.renderWaveForm = renderWaveForm;
window.WaveDrom.editorRefresh = editorRefresh;
window.WaveDrom.eva = eva;
window.WaveDrom.version = pkg.version;
window.WaveSkin = skins;