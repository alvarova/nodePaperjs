var fs = require('fs');
var path = require('path');
var paper = require('paper-jsdom-canvas');


processSVG = (data) => {
    var SVG = paper.project.importSVG( data, {
        expandShapes: true
    });
    //console.log(SVG);
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
    return 1;
}


paper.setup(new paper.Size(1024, 1024));

var SVGFile = 'M-00040-11-07.svg';
var svgData = "";
// Use fs.readFile() method to read the file
fs.readFile(SVGFile, 'utf8', function(err, data){
    svgData = data;
    console.log(svgData); 
    result = processSVG(svgData); 
    console.log(result);
});

    

/*
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
}*/


