let startPassed = false; // whether the first click has been made in setting the flags
let endPassed = false; // whether the second click has been made in settings the flags

c.onclick = function() { // click event
    let mouseX = event.clientX; // records x value of mouse
    let mouseY = event.clientY; // records y value of mouse]
    let scrollX = window.scrollX; // how far to the right the user has scrolled, so the clicks map to the canvas accurately
    let scrollY = window.scrollY; // how for down the user has scrolled
    if(!startPassed) { // checks whether the first click has been made
        myGrid.passStart(mouseX + scrollX, mouseY + scrollY, c.width, c.height); // notifies the grid of the first click, to draw the start node
        startPassed = true; // sets flag
        endPassed=true;
    }
    else if(!endPassed) { // checks whether the second click has been made
        myGrid.passEnd(mouseX + scrollX, mouseY + scrollY, c.width, c.height); // notifies the grid of the second click, to draw the end node
        endPassed = true; // sets flag
    }
    else {
        myGrid.passChange(mouseX, mouseY); // notifies the grid of additional click, toggles empty/blocked cells
    }
}

c.onkeypress = function() { // keypress event
    let key = event.key;
    if(key == 'e') { // if key is e
        aStarIterate(myGrid); // iterate the astar function
    }
}