var fs = require('fs');
var path = require('path');
var paper = require('paper-jsdom-canvas');
const { result } = require('lodash');


importerSVG = (data) => {
    var SVG = paper.project.importSVG( data, {
        expandShapes: true
    });
    //console.log(SVG);
    return SVG;

}

exporterSVG = (data) => {
    console.log('generating SVG');
    console.log(data);
    
    var svg = data.exportSVG({
        asString: true,
        precision: 2,
        matchShapes: true,
        embedImages: false
    });
    fs.writeFile(path.resolve('./out.svg'),svg, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    return "Waiting for SVG.";
}

processerSVG = (data) => {

}



/***********************
 * Script for load SVG, 
 * simplify and Export SVG
 ************************/

paper.setup(new paper.Size(1024, 1024));

var SVGFile = 'TestIn.svg';
var svgData = "";
// Use fs.readFile() method to read the file
fs.readFile(SVGFile, 'utf8', function(err, data){
    svgData = data;
    //console.log(svgData); 
    var result = importerSVG(svgData); 
    //result.fullySelected = true;
    //var lineas = result.path;
    vectores = new paper.Path({
        segments: result,
        strokeColor: 'black',
        selected: true
    });

    console.log('Smoothing...');
    vectores.smooth( {type: 'continuous'})
    console.log('Simplified...');
    vectores.simplify();

    //procesed = processerSVG(result);
    exported = exporterSVG(vectores);
    console.log(exported);
});

    


