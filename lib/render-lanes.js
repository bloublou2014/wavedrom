'use strict';

const renderMarks = require('./render-marks');
const renderArcs = require('./render-arcs');
const renderGaps = require('./render-gaps');

function renderLanes(index, content, waveLanes, ret, source, lane) {
    return [renderMarks(content, index, lane, source)]
        .concat(waveLanes.res)
        .concat([renderArcs(ret.lanes, index, source, lane)])
        .concat([renderGaps(ret.lanes, index, lane)]);
}

module.exports = renderLanes;
