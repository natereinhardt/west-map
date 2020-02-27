var c = document.getElementById("myCanvas");
c.width = document.getElementById("FirstFloor").width;
c.height = document.getElementById("FirstFloor").height;
var ctx = c.getContext("2d");
ctx.beginPath();


let myGrid = new Grid(150, 150, Math.floor(c.width/130), Math.floor(c.height/130)); // instantiate grid with parameters
let loadedData = getCellArrayFromText(text);
myGrid.cells = loadedData;
myGrid.setDimensions();

setInterval(function(){
    drawGrid(myGrid); 
    drawFloor(document.getElementById("FirstFloor")); 
}, 30); // draw every 30 ms
 
function drawGrid(gridIn) { // draws the entire grid to the screen
    cellWidth = gridIn.cellWidth; // determines how wide each cell must be to fill the screen
    cellHeight = gridIn.cellHeight; // determines how tall each cell must be to fill the screen
    
    for(let row = 0; row < gridIn.height; row++) { // iterates through the rows of the grid
        for(let col = 0; col < gridIn.width; col++) { // iterates through the columns of the grid
            ctx.beginPath(); // starts the shape
            ctx.globalAlpha = 0.5;
            ctx.lineWidth = "1"; // sets border size to 1 pixel
            ctx.strokeStyle = "black"; // sets border color to black
            switch(gridIn.cells[row][col]) { // switch statement determines which color a cell is drawn with
                case 0:
                    ctx.fillStyle = "#FFFFFF"; // white
                    break;
                case 1:
                    ctx.fillStyle = "#000000"; // black
                    break;
                default:
                    ctx.fillStyle = "#003333"; // turqoise
                    break;
            }
            ctx.rect(col*cellWidth, row*cellHeight, cellWidth, cellHeight); // draws the rectangle at the according position within the grid
            ctx.stroke(); // draws border
            ctx.fill(); // draws interior
        }
    }
    for(let i = 0; i < gridIn.lines.length; i++) { // draws the lines the user has made on the screen
        ctx.beginPath();
        ctx.globalAlpha = 0.5; // transparent for the purpose of viewing the image at the same time
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#444444";
        ctx.moveTo(gridIn.lines[i].x1, gridIn.lines[i].y1);
        ctx.lineTo(gridIn.lines[i].x2, gridIn.lines[i].y2);
        ctx.stroke(); // draws line
    }
}

function drawFloor(img) { // draws the image for the user to view while tracing
    ctx.beginPath();
    globalAlpha = 0.5; // transparent for viewing the grid at the same time
    ctx.drawImage(img, 0, 0); // draws image
}