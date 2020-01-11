'use strict';
const defaultSkin = require('../skins/default.js');
const narrowSkin = require('../skins/narrow.js');
const lowkeySkin = require('../skins/lowkey.js');

const skins = {
    default: defaultSkin,
    narrow: narrowSkin,
    lowkey: lowkeySkin
};

function getSkin(source) {
    if (source && source.config && source.config.skin && skins[source.config.skin]) {
        return skins[source.config.skin];
    }
    return skins.default;
}

function getSkinSocket(source) {
    const skin = getSkin(source);
    return skin.defs.socket;
}

module.exports = {
    skins: skins,
    getSkin: getSkin,
    getSkinSocket: getSkinSocket
};