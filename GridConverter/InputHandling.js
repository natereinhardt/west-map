// Handles input for the project, namely for the purpose of the user placing lines on the grid

var firstClick; // point that the user first clicked at (mod 2)
var secondClick; // second point the user clicks (mod 2)
var waitingOnSecondClick = false; // determines which click the program is waiting on


c.onclick = function() { // triggers each time the mouse is clicked
    let mouseX = event.clientX; // the x position of the user's mouse, starting from the top left of their screen
    let mouseY = event.clientY; // the y position
    let scrollX = window.scrollX; // how far to the right the user has scrolled, so the clicks map to the canvas accurately
    let scrollY = window.scrollY; // how for down the user has scrolled
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