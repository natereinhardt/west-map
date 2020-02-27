//This file is a little less intuitive than others; its purpose is to make searching 'around' a cell less messy in other areas

const relativeVectors = { // collection of vectors used to gather cells around a given cell
    up: new Vector(-1, 0),
    upRight: new Vector(-1, 1),
    right: new Vector(0, 1),
    downRight: new Vector(1, 1),
    down: new Vector(1, 0),
    downLeft: new Vector(1, -1),
    left: new Vector(0, -1),
    upLeft: new Vector(-1, -1)
}

function getRelatives(gridIn, cell) { // gathers the hard-coded valid cells around a cell, that is--to avoid attemping to grab cells outside of the grid.
    if(cell.col == gridIn.width - 1) { // cell is somewhere on the right edge of the grid
        if(cell.row == gridIn.height - 1) { //cell is on the bottom right corner of the grid
            var relatives = [relativeVectors.left,
                             relativeVectors.upLeft, 
                             relativeVectors.up];        
        }
        else if(cell.row == 0) { // cell is on the top right corner of the grid
            var relatives = [relativeVectors.down,
                             relativeVectors.downLeft,
                             relativeVectors.downRight];
        }
        else { // cell is along the right edge of the grid, but not on a corner
            var relatives = [relativeVectors.down,
                             relativeVectors.downLeft,
                             relativeVectors.left,
                             relativeVectors.upLeft,
                             relativeVectors.up];
        }
    }
    else if(cell.col == 0) { // cell is somewhere on the left edge of the grid
        if(cell.row == gridIn.height - 1) { // cell is on the bottom left corner of the grid
            var relatives = [relativeVectors.up,
                             relativeVectors.upRight,
                             relativeVectors.right];
        }
        else if (cell.row == 0) { // cell is on the top left corner of the grid
            var relatives = [relativeVectors.right,
                             relativeVectors.downRight,
                             relativeVectors.down];
        }
        else { // cell is along the left edge of the grid, but not on a corner
            var relatives = [relativeVectors.up,
                             relativeVectors.upRight,
                             relativeVectors.right,
                             relativeVectors.downRight,
                             relativeVectors.down];
        }
    }
    else if (cell.row == 0) { // cell is along the top of the grid, but not on a corner
        var relatives = [relativeVectors.right,
                         relativeVectors.downRight,
                         relativeVectors.down,
                         relativeVectors.downLeft,
                         relativeVectors.left];
    }
    else if (cell.row == gridIn.height - 1) { // cell is along the bottom of the grid, but not on a corner
        var relatives = [relativeVectors.left,
                         relativeVectors.upLeft,
                         relativeVectors.up,
                         relativeVectors.upRight,
                         relativeVectors.right];
    }
    else { // cell is not along any edges, and standard relatives can be used
        var relatives = [relativeVectors.up,
                         relativeVectors.upRight,
                         relativeVectors.right,
                         relativeVectors.downRight,
                         relativeVectors.down,
                         relativeVectors.downLeft,
                         relativeVectors.left,
                         relativeVectors.upLeft];
    }
    return relatives; //this can return relatives because var creates objects with function-wide scope
}