'use strict';

const genFirstWaveBrick = require('./gen-first-wave-brick'),
    genWaveBrick = require('./gen-wave-brick'),
    findLaneMarkers = require('./find-lane-markers');


function repeater(stack) {
    let repeats = 1;
    while (stack[0] === '.' || stack[0] === '|') { // repeaters parser
        stack.shift();
        repeats += 1;
    }
    return repeats;
}

// text is the wave member of the signal object
// extra = hscale-1 ( padding )
// lane is an object containing all properties for this waveform
function parseWaveLane(text, extra, lane) {
    let repeats, previous, next, stack = [], result = [], i, subCycle;
    const unseenBricks = [];
    let numUnseenMarkers;

    stack = text.split('');
    next = stack.shift();
    subCycle = false;

    repeats = repeater(stack);
    result = result.concat(genFirstWaveBrick(next, extra, repeats));

    while (stack.length) {
        previous = next;
        next = stack.shift();
        if (next === '<') { // sub-cycles on
            subCycle = true;
            next = stack.shift();
        }
        if (next === '>') { // sub-cycles off
            subCycle = false;
            next = stack.shift();
        }
        repeats = repeater(stack);
        const brickToGenerate = (previous + next);
        let brick;
        if (subCycle) {
            brick = genWaveBrick(brickToGenerate, 0, repeats - lane.period);
        } else {
            brick = genWaveBrick(brickToGenerate, extra, repeats);
        }
        result = result.concat(brick);
    }
    // shift out unseen bricks due to phase shift, and save them in
    //  unseenBricks array
    for (i = 0; i < lane.phase; i += 1) {
        unseenBricks.push(result.shift());
    }
    if (unseenBricks.length > 0) {
        numUnseenMarkers = findLaneMarkers(unseenBricks).length;
        // if end of unseenBricks and start of result both have a marker,
        //  then one less unseen marker
        if (findLaneMarkers([unseenBricks[unseenBricks.length - 1]]).length === 1 &&
            findLaneMarkers([result[0]]).length === 1) {
            numUnseenMarkers -= 1;
        }
    } else {
        numUnseenMarkers = 0;
    }

    // result is array of half brick types, each is item is string
    // numUnseenMarkers is how many markers are now unseen due to phase
    return [result, numUnseenMarkers];
}

module.exports = parseWaveLane;
