function gcost(cell, relativeX, relativeY) {
    let currentStep = Math.sqrt(relativeX*relativeX + relativeY*relativeY);
    if(cell.parent.type == cellType.START) {
        var previousStep = 0;
    }
    else {
        var previousStep = cell.parent.gcost;
    }
    return currentStep + previousStep;
}

function hcost(cell, end) {
    return Math.sqrt((end.col - cell.col)*(end.col - cell.col) + (end.row - cell.row)*(end.row - cell.row));
}

function fcost(cell, end, relativeX, relativeY) {
    return gcost(cell, relativeX, relativeY) + hcost(cell, end);
}