'use strict';

function arcShapeBidirectional(Edge, from, to, dx, dy, lx, ly) {
    let d;
    let style;
    switch (Edge.shape) {
    case '<->' :
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        break;
    case '<~>' :
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    case '<-~>':
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) {
            lx = (from.x + (to.x - from.x) * 0.75);
        }
        break;
    case '<-|>' :
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) {
            lx = to.x;
        }
        break;
    case '<-|->':
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    default:
        return undefined;
    }
    return {
        lx: lx,
        ly: ly,
        d: d,
        style: style
    };
}


function arcShapeMarker(Edge, from, to, dx, dy, lx, ly) {
    let d;
    let style;
    switch (Edge.shape) {

    case '->' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        break;
    }
    case '~>' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + 0.3 * dx + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '-~>': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) {
            lx = (from.x + (to.x - from.x) * 0.75);
        }
        break;
    }
    case '~->': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + 0 + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) {
            lx = (from.x + (to.x - from.x) * 0.25);
        }
        break;
    }
    case '-|>' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) {
            lx = to.x;
        }
        break;
    }
    case '|->' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
        if (Edge.label) {
            lx = from.x;
        }
        break;
    }
    case '-|->': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    default:
        return undefined;
    }
    return {
        lx: lx,
        ly: ly,
        d: d,
        style: style
    };
}

function arcShapeSimple(Edge, from, to, dx, dy, lx, ly) {
    let d;
    let style;
    switch (Edge.shape) {
    case '-'  :
        break;
    case '~'  :
        d = ('M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    case '-~' :
        d = ('M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' + dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) {
            lx = (from.x + (to.x - from.x) * 0.75);
        }
        break;
    case '~-' :
        d = ('M ' + from.x + ',' + from.y + ' c ' + 0 + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) {
            lx = (from.x + (to.x - from.x) * 0.25);
        }
        break;
    case '-|' :
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) {
            lx = to.x;
        }
        break;
    case '|-' :
        d = ('m ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
        if (Edge.label) {
            lx = from.x;
        }
        break;
    case '-|-':
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    default:
        style = ('fill:none;stroke:#F00;stroke-width:1');
        break;
    }
    return {
        lx: lx,
        ly: ly,
        d: d,
        style: style
    };
}

function arcShape(Edge, from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let lx = ((from.x + to.x) / 2);
    const ly = ((from.y + to.y) / 2);

    return arcShapeMarker(Edge, from, to, dx, dy, lx, ly)
        || arcShapeBidirectional(Edge, from, to, dx, dy, lx, ly)
        || arcShapeSimple(Edge, from, to, dx, dy, lx, ly);
}

module.exports = arcShape;
