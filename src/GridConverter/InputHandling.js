// Handles input for the project, namely for the purpose of the user placing lines on the grid

var firstClick; // point that the user first clicked at (mod 2)
var secondClick; // second point the user clicks (mod 2)
var waitingOnSecondClick = false; // determines which click the program is waiting on
var globalMouseX;
var globalMouseY;
var offset = 7; // offset since mouseX and mouseY seem to be further right and down than they should be


c.onclick = function() { // triggers each time the mouse is clicked
    let mouseX = event.clientX-offset; // the x position of the user's mouse, starting from the top left of their screen
    let mouseY = event.clientY-offset; // the y position
    let scrollX = window.scrollX; // how far to the right the user has scrolled, so the clicks map to the canvas accurately
    let scrollY = window.scrollY; // how far down the user has scrolled
    if(waitingOnSecondClick) {
        waitingOnSecondClick = false; // toggle which click is being watched
        secondClick = new Point(mouseX + scrollX, mouseY+scrollY); // set the x and y positions that the user clicked on
        myGrid.addLine(new Line(firstClick.x, firstClick.y, secondClick.x, secondClick.y)); // create and store the line the user created with both clicks
        let intersections = getIntersections(myGrid.lines[myGrid.lines.length-1], myGrid); // get the intersections caused by the line
        for(let i = 0; i < intersections.length; i++) { // store the intersctions in the grid
            myGrid.cells[intersections[i].x][intersections[i].y] = 0;
        }
    }
    else {
        waitingOnSecondClick = true; // toggle which click is being watched
        firstClick = new Point(mouseX + scrollX, mouseY+scrollY); //set the x and y positions that the user clicked on
    }
}

document.addEventListener("keypress", function(event) {
    if (event.key == "z") { // undo button
        myGrid.lines.length -= 1;
        let tempLines = myGrid.lines;
        myGrid = new Grid(myGrid.width, myGrid.height, myGrid.cellWidth, myGrid.cellHeight);
        for(let j = 0; j < tempLines.length; j++) {
            let intersections = getIntersections(tempLines[j], myGrid); // get the intersections caused by the line
            for(let i = 0; i < intersections.length; i++) { // store the intersctions in the grid
                myGrid.cells[intersections[i].x][intersections[i].y] = 0;
            }
        }
        myGrid.lines = tempLines;
    }
    if(event.key == "f") { // enter data for a cell
        let mouseX = globalMouseX; // the x position of the user's mouse, starting from the top left of their screen
        console.log(mouseX);
        let mouseY = globalMouseY; // the y position
        let scrollX = window.scrollX; // how far to the right the user has scrolled, so the clicks map to the canvas accurately
        let scrollY = window.scrollY; // how far down the user has scrolled
        let id = Number(prompt("Enter The Target ID (Preface with a 1)", "1[id]"));
        myGrid.cells[Math.floor((mouseY+scrollY)/myGrid.cellHeight)][Math.floor((mouseX+scrollX)/myGrid.cellWidth)] = id;
    }
})

document.addEventListener('mousemove', function(evt) {
    globalMouseX = evt.clientX-offset; // offset adjusts for an offset of a few pixels whose cause I couldn't find
    globalMouseY = evt.clientY-offset;
    let scrollX = window.scrollX;
    let scrollY = window.scrollY;
    document.getElementById('textbox').innerHTML = "ID: " + myGrid.cells[Math.floor((globalMouseY+scrollY)/myGrid.cellHeight)][Math.floor((globalMouseX+scrollX)/myGrid.cellWidth)];
    document.getElementById('textbox').style.position = "absolute";
    document.getElementById('textbox').style.left = globalMouseX + scrollX + 30 + "px";
    document.getElementById('textbox').style.top = globalMouseY + scrollY + 30 + "px";
    //console.log(globalMouseX + ", " + globalMouseY);
  }, false);