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
    return "Waiting for SVG.";
}

processerSVG = (data) => {

}



/***********************
 * Script for load SVG, 
 * simplify and Export SVG
 ************************/

paper.setup(new paper.Size(1024, 1024));

// Setting white background 
var background = new paper.Shape.Rectangle(
    new paper.Point(0, 0),
    new paper.Size(1024, 1024)
    )
background.fillColor = new paper.Color(1, 1, 1, 1);

//paper.view.viewSize.width = 512;
//paper.view.viewSize.height = 512;



//List of SVG elements loaded
console.log(paper.project.activeLayer.children)

var SVGFile = 'TestIn.svg';
var svgData = "";
// Use fs.readFile() method to read the file
fs.readFile(SVGFile, 'utf8', function(err, data){
    svgData = data;
    //Get data and convert to paperjs object
    var result = importerSVG(svgData); 

    //result.fullySelected = true;
    //var lineas = result.path;
    vectores = new paper.Path({
        segments: result,
        strokeColor: 'black',
        selected: true
    });
    //paper.PaperScope.Size(512,512)
    //paper.Path.smooth();

    console.log('Smoothing...');
    vectores.smooth( {type: 'continuous'})
    console.log('Simplified...');
    vectores.simplify();

    //procesed = processerSVG(result);
    exported = exporterSVG(vectores);
    //console.log(exported);
});

    


