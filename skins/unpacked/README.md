## WaveDrom Skin

WaveDrom rendering engine uses SVG template (skin) to create output diagram.
Effectively the skin contains building blocks (bricks) of different parts of waveform graphics.
Each brick is an SVG group with unique id. WaveDrom engine will include template into
every diagram picture and build picture referencing to elements with specific ids.

[default.svg](./skins/default.svg)

### Drawing the skin

User can define own skin in order to change expression properties of resulted timing diagram.
[http://inkscape.org/ Inkscape] editor can be used to draw the skin.

See 
[default.svg](./skins/default.svg) and
[narrow.svg](./skins/narrow.svg)
source for example.

### Packing the skin

The source skin SVG need to be converted by
[svg2skin.js](./svg2skin.js)
script in order to be used by WaveDrom.

The resulted JSON file much smaller in size and has meta-information needed for WaveDrom to work.

See the example of packed skin:
- [default.js](../default.js) / [default.css](../default.css) 
- [lowkey.js](../lowkey.js) / [lowkey.css](../lowkey.css) 
- [narrow.js](../narrow.js) / [narrow.css](../narrow.css) 
