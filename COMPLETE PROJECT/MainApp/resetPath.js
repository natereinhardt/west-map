function resetPath(resetID) {
    
    myGrid = new Grid(120, 60);

let newCells = getCellArrayFromText(floor1); // text is pulled directly from data file, choose floor
myGrid.cells = newCells; // lazy way of instantiating the array size

myGrid.setDimensions(); // sets the dimensions of the grid based on the dimensions of the newly generated cell array
//
//
myGrid.searchID = resetID;
//
//
myGrid.setEndBySearchID();
startPassed = false;
endPassed = false;

myGrid.passStart(300, 200, c.width, c.height);
startPassed=true;
}