'use strict';

function findLaneMarkers(lanetext) {
    let gCount = 0,
        lCount = 0;
    const ret = [];

    lanetext.forEach(function (e) {
        if ((e === 'vvv-2') ||
            (e === 'vvv-3') ||
            (e === 'vvv-4') ||
            (e === 'vvv-5') ||
            (e === 'vvv-6') ||
            (e === 'vvv-7') ||
            (e === 'vvv-8') ||
            (e === 'vvv-9')) {
            lCount += 1;
        } else {
            if (lCount !== 0) {
                ret.push(gCount - ((lCount + 1) / 2));
                lCount = 0;
            }
        }
        gCount += 1;
    });

    if (lCount !== 0) {
        ret.push(gCount - ((lCount + 1) / 2));
    }

    return ret;
}

module.exports = findLaneMarkers;
