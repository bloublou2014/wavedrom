'use strict';

const eva = require('./eva');
const appendSaveAsDialog = require('./append-save-as-dialog');
const renderWaveForm = require('./render-wave-form');
const css = require('./process-all-header.css');

function processAll() {
    let points,
        i,
        index,
        iwave,
        obj,
        node0;
    // node1;

    // first pass
    index = 0; // actual number of valid anchor
    points = document.querySelectorAll('*');
    for (i = 0; i < points.length; i++) {
        if (points.item(i).type && points.item(i).type === 'WaveDrom') {
            points.item(i).setAttribute('id', 'InputJSON_' + index);

            node0 = document.createElement('div');
            // node0.className += 'WaveDrom_Display_' + index;
            node0.id = 'WaveDrom_Display_' + index;
            points.item(i).parentNode.insertBefore(node0, points.item(i));
            // WaveDrom.InsertSVGTemplate(i, node0);
            index += 1;
        }
    }
    // second pass
    iwave = 0;
    for (i = 0; i < index; i += 1) {
        obj = eva('InputJSON_' + i);
        renderWaveForm(iwave, obj, 'WaveDrom_Display_');
        appendSaveAsDialog(i, 'WaveDrom_Display_');
        if (obj && obj.signal) {
            iwave += 1;
        }
    }
    // add styles
    document.head.innerHTML += '<style type="text/css">' + css + '</style>';
}

module.exports = processAll;
