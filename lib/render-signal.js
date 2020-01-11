'use strict';

const rec = require('./rec');
const defaultLane = require('./lane');
const parseConfig = require('./parse-config');
const parseWaveLanes = require('./parse-wave-lanes');
const renderGroups = require('./render-groups');
const renderLanes = require('./render-lanes');
const renderWaveLane = require('./render-wave-lane');
const _ = require('lodash');
const insertSVGTemplate = require('./insert-svg-template');
const skins = require('./skins');

function laneParamsFromSkin(index, source) {
    if (index !== 0) {
        return;
    }
    const socket = skins.getSkinSocket(source);
    return _.defaults({
        xs: Number(socket.size.width),
        ys: Number(socket.size.height),
        xlabel: Number(socket.size.x),
        ym: Number(socket.size.y)
    }, defaultLane);
}

function renderSignal(index, source) {
    const lane = laneParamsFromSkin(index, source);
    parseConfig(source, lane);
    const ret = rec(source.signal);
    const content = parseWaveLanes(ret.lanes, lane);
    const waveLanes = renderWaveLane(content, index, lane);
    const waveGroups = renderGroups(ret.groups, index, lane);
    const xmax = waveLanes.glengths.reduce(function (res, len, i) {
        return Math.max(res, len + ret.width[i]);
    }, 0);

    lane.xg = Math.ceil((xmax - lane.tgo) / lane.xs) * lane.xs;

    const skin = skins.getSkin(source);
    return insertSVGTemplate(
        index, source, lane, skin, content,
        renderLanes(index, content, waveLanes, ret, source, lane),
        waveGroups
    );

}

module.exports = renderSignal;
