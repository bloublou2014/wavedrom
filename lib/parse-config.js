'use strict';

function toNumber(x) {
    return x > 0 ? Math.round(x) : 1;
}

function parseHboundsConfig(hbounds, lane) {
    if (!hbounds || hbounds.length !== 2) {
        return;
    }
    hbounds[0] = Math.floor(hbounds[0]);
    hbounds[1] = Math.ceil(hbounds[1]);
    if (hbounds[0] < hbounds[1]) {
        // convert hbounds ticks min, max to bricks min, max
        // TODO: do we want to base this on ticks or tocks in
        //  head or foot?  All 4 can be different... or just 0 reference?
        lane.xmin_cfg = 2 * Math.floor(hbounds[0]);
        lane.xmax_cfg = 2 * Math.floor(hbounds[1]);
    }
}

function parseHscaleConfig(hscale, lane) {
    if (!hscale) {
        return;
    }
    let hscaleInt = Math.round(toNumber(hscale));
    if (hscaleInt > 0) {
        lane.hscale = Math.min(hscaleInt, 100);
    }
}

function parseHeadFootConfig(lane, hf, y0, y1) {
    if (!hf) {
        return;
    }
    if (hf.tick || hf.tick === 0 || hf.tock || hf.tock === 0) {
        y0 = 20;
    }
    // if tick defined, modify start tick by lane.xmin_cfg
    if (hf.tick || hf.tick === 0) {
        hf.tick = hf.tick + lane.xmin_cfg / 2;
    }
    // if tock defined, modify start tick by lane.xmin_cfg
    if (hf.tock || hf.tock === 0) {
        hf.tock = hf.tock + lane.xmin_cfg / 2;
    }
    let text;
    if (hf.text) {
        y1 = 46;
        text = hf.text;
    }
    return {
        y0: y0,
        y1: y1,
        text: text
    };
}

function parseHeadConfig(head, lane) {
    if (!head) {
        return;
    }
    const res = parseHeadFootConfig(lane, head, lane.yh0, lane.yh1);
    lane.head.text = res.text;
    lane.yh0 = res.y0;
    lane.yh1 = res.y1;
}

function parseFootConfig(foot, lane) {
    if (!foot) {
        return;
    }
    const res = parseHeadFootConfig(lane, foot, lane.yf0, lane.yf1);
    lane.foot.text = res.text;
    lane.yf0 = res.y0;
    lane.yf1 = res.y1;
}

function parseConfig(source, lane) {
    lane.hscale = 1;
    lane.yh0 = 0;
    lane.yh1 = 0;
    lane.yf0 = 0;
    lane.yf1 = 0;
    lane.head = source.head;
    lane.foot = source.foot;
    lane.xmin_cfg = 0;
    lane.xmax_cfg = 1e12; // essentially infinity
    if (source && source.config) {
        parseHscaleConfig(source.config.hscale, lane);
        parseHboundsConfig(source.config.hbounds, lane);
        parseHeadConfig(source.config.head, lane);
        parseFootConfig(source.config.foot, lane);
    }
}

module.exports = parseConfig;
