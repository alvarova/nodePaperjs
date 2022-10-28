var fs = require('fs');
var path = require('path');
var paper = require('paper-jsdom-canvas');

function random_range(min, max) {
  return Math.random() * (max - min) + min;
}

paper.setup(new paper.Size(512, 512));

for (var i = 0; i < 15000; i++) {
    console.log('iteration: ' + (i + 1));
    var cx = random_range(0, paper.view.size.width);
    var cy = random_range(0, paper.view.size.height);
    var r = random_range(3, 100);
    var c = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    var circle = new paper.Path.Circle({
        center: [cx, cy],
        radius: r,
        fillColor: c
    });
}

console.log('generating SVG');
var svg = paper.project.exportSVG({
    asString: true,
    precision: 2,
    matchShapes: true,
    embedImages: false
});

fs.writeFile(path.resolve('./out.svg'),svg, function (err) {
    if (err) throw err;
    console.log('Saved!');
});