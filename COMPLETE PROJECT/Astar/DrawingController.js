//This file is used as part of the html mockup to draw the grid to the screen as well as demo a few things
var c = document.getElementById("myCanvas");
c.width = document.getElementById("SecondFloor").width;
c.height = document.getElementById("SecondFloor").height;


var ctx = c.getContext("2d"); // creates the 2d drawing handler for the canvas

let myGrid = new Grid(150, 150);

let cells = getCellArrayFromText(floor2); // text is pulled directly from data file, choose floor
myGrid.cells = cells; // lazy way of instantiating the array size

myGrid.setDimensions(); // sets the dimensions of the grid based on the dimensions of the newly generated cell array
//
//
myGrid.searchID = Number(prompt("Enter your room destination, then click your location on the map.", "111"));
//
//
myGrid.setEndBySearchID();

//myGrid.initializeRandom(.8); //random initilization testCode
drawGrid(myGrid);
setInterval(function(){ drawFloor(document.getElementById("SecondFloor")); drawGrid(myGrid); if(startPassed==true){for(let i = 0; i < 100; i++) {aStarIterate(myGrid)}} }, 30);

function drawGrid(gridIn) { // draws the entire grid to the screen
    let drawPath = false;
    cellWidth = Math.ceil(c.width/gridIn.width); // determines how wide each cell must be to fill the screen
    cellHeight = Math.ceil(c.height/gridIn.height); // determines how tall each cell must be to fill the screen
    gridIn.cellWidth = cellWidth;
    gridIn.cellHeight = cellHeight;
    
    for(let row = 0; row < gridIn.height; row++) { // iterates through the rows of the grid
        for(let col = 0; col < gridIn.width; col++) { // iterates through the columns of the grid
            ctx.beginPath(); // starts the shape
            ctx.globalAlpha = 0.5;
            ctx.lineWidth = "1"; // sets border size to 1 pixel
            ctx.strokeStyle = "black"; // sets border color to black
            switch(gridIn.cells[row][col].type) { // switch statement determines which color a cell is drawn with
                case cellType.EMPTY:
                    ctx.fillStyle = "#FFFFFF"; // white
                    break;
                case cellType.BLOCKED:
                    ctx.fillStyle = "#000000"; // black
                    break;
                case cellType.START:
                    ctx.fillStyle = "#4400EE"; // blue-purple
                    break;
                case cellType.OPEN:
                    ctx.fillStyle = "#00FF00"; // green
                    break;
                case cellType.CLOSED:
                    ctx.fillStyle = "#FF0000"; // red
                    break;
                case cellType.FINISH:
                    ctx.fillStyle = "#EE0044"; // red-purple
                    break;
                case cellType.PATH:
                    drawPath=true;
                    ctx.fillStyle = "#333333"; // gray
                    break;
                case cellType.TARGET:
                    ctx.fillStyle = "#003333"; // turquoise
                    break;
            }
            //ctx.rect(col*cellWidth, row*cellHeight, cellWidth, cellHeight); // draws the rectangle at the according position within the grid
            //ctx.stroke();
            //ctx.fill();
            ctx.closePath();
        }
    }
    if(gridIn.solved) {
        buildLine(myGrid);
    }
}

function drawFloor(img) { // draws the image for the user to view while tracing
    ctx.beginPath();
    globalAlpha = 0.5; // transparent for viewing the grid at the same time
    ctx.drawImage(img, 0, 0); // draws image
}