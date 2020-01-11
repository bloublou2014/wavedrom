'use strict';

function error(e) {
    return {signal: [{name: ['tspan', ['tspan', {class: 'error h5'}, 'Error: '], e.message]}]};
}

function eva(id) {
    let TheTextBox = document.getElementById(id);
    let source;
    try {
        const value = (TheTextBox.type && TheTextBox.type === 'textarea') ? TheTextBox.value : TheTextBox.innerHTML;
        source = eval('(' + value + ')');
    } catch (e) {
        return error(e);
    }

    if (Object.prototype.toString.call(source) !== '[object Object]') {
        return error({message: '[Semantic]: The root has to be an Object: "{signal:[...]}"'});
    }
    if (source.signal) {
        if (Object.prototype.toString.call(source.signal) !== '[object Array]') {
            return error({message: '[Semantic]: "signal" object has to be an Array "signal:[]"'});
        }
    } else if (source.assign) {
        if (Object.prototype.toString.call(source.assign) !== '[object Array]') {
            return error({message: '[Semantic]: "assign" object hasto be an Array "assign:[]"'});
        }
    } else if (source.reg) {
        // test register
    } else {
        return error({message: '[Semantic]: "signal:[...]" or "assign:[...]" property is missing inside the root Object'});
    }
    return source;
}

module.exports = eva;
