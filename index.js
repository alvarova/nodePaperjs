//var paper = require('paper-jsdom-canvas');

const paper = require('paper-jsdom');
const fs = require('fs');

var size = new paper.Size(512, 512)
paper.setup(size);

var SVGFile = 'M-00040-11-07.svg';
/*
var path = new paper.Path();
path.strokeColor = '#348BF0';

var start = new paper.Point(100, 100);
var end = new paper.Point(200, 200);

path.moveTo(start);
path.lineTo(end);*/
var svgData = "";
// Use fs.readFile() method to read the file
fs.readFile(SVGFile, 'utf8', function(err, data){
      
    // Display the file content
    svgData = data;
});

console.log(svgData);
var SVG = paper.importSVG( svgData, {
    expandShapes: true,
    onLoad: function(item) {
      console.log("imported SVG!");
  
    },
    onError: console.log("something went wrong importing")
  });



//SVG.selectAll();
SVG.path.selectAll;
SVG.path.smooth();
console.log('width', path.bounds.width, 'height', path.bounds.height);

var svg = paper.project.exportSVG({asString:true});
fs.writeFileSync('punchline.svg', svg);