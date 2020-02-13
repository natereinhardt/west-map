// algorithmic necessities for the astar algorithm.
function gcost(cell, relativeX, relativeY) { // movement distance from start to the cell in question
    let currentStep = Math.sqrt(relativeX*relativeX + relativeY*relativeY);
    if(cell.parent.type == cellType.START) {
        var previousStep = 0;
    }
    else {
        var previousStep = cell.parent.gcost;
    }
    return currentStep + previousStep;
}

function hcost(cell, end) { // absolute distance from cell to the end
    return Math.sqrt((end.col - cell.col)*(end.col - cell.col) + (end.row - cell.row)*(end.row - cell.row));
}

function fcost(cell, end, relativeX, relativeY) { // sum of g and h cost
    return gcost(cell, relativeX, relativeY) + hcost(cell, end);
}