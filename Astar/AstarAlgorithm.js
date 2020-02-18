function aStarIterate(gridIn) { // iterates the function a step forward
    if(gridIn.openCells.length > 0 && !gridIn.solved) { // if there are open cells to explore and the path is unfinished
        let lowestFCost = gridIn.openCells[0].fcost; // arbitrarily sets the first value for finding the lowest fcost
        let lowestFCostIndex = 0;
        if(gridIn.openCells.length>1) {
            for(let i = 0; i < gridIn.openCells.length; i++) {
                if(gridIn.openCells[i].fcost < lowestFCost) {
                    lowestFCost = gridIn.openCells[i].fcost; // find the lowest fcost of any open cell -> algorithmically best to explore next
                    lowestFCostIndex = i; // find the index of the given cell
                }
            }
        }
        openAroundOpenCell(gridIn, lowestFCostIndex); // explores the cells around the low f cost cell
    }
    else if(!gridIn.solved) { // if there are no open cells yet and the path is unfinished
        openAroundStartCell(gridIn); // opens the cells around the start cell
    }
}

function openAroundOpenCell(gridIn, openCellIndex) { // explores the cells around a given cell
    let relatives = getRelatives(gridIn, gridIn.openCells[openCellIndex]); // gets the array of vectors describing the positions in a grid around another position
    for(let i = 0; i < relatives.length; i++) { // iterate through each relative
        let rowVariation = relatives[i].x; // pull the row relative variation
        let colVariation = relatives[i].y; // pull the column relative variation
        let startRow = gridIn.openCells[openCellIndex].row; // find the row of the cell being explored around
        let startCol = gridIn.openCells[openCellIndex].col; // find the column of the cell being explored around
        let relativeCellRow = startRow + rowVariation; // find the row of the next relative cell to be looked at
        let relativeCellCol = startCol + colVariation; // find the column of the next relative cell to be looked at
        let relativeCell = gridIn.cells[relativeCellRow][relativeCellCol]; // find the next relative cell to be looked at
        let relativeCellType = relativeCell.type; // find the type of the relative cell (for later convenience)
        if(relativeCellType == cellType.FINISH || (relativeCellType == cellType.TARGET && relativeCell.id==gridIn.searchID)) { // first checks if the cell is finishing, which would end the path
            gridIn.solved = true; // mark the grid as solved, since a path has been discovered
            let recursingCell = gridIn.openCells[openCellIndex]; // begin recursing cell by cell to draw the path
            while(recursingCell.type!=cellType.START) { // continue recursing until the start cell
                recursingCell.type = cellType.PATH; // change cell to path cell
                recursingCell = recursingCell.parent; // recurse to the cell's parent
            }
            return; // return since no more needs to be done if the path is finished
        }
        else if (relativeCellType == cellType.EMPTY) { // second, check if the relative cell is empty, and can be explored as a result
            relativeCell.parent = gridIn.openCells[openCellIndex]; // set the parent of the relative cell as the cell being explored from
            relativeCell.gcost = gcost(relativeCell, rowVariation, colVariation); // set the gcost of the cell
            relativeCell.hcost = hcost(relativeCell, gridIn.endCell); // set the hcost of the cell
            relativeCell.fcost = fcost(relativeCell, gridIn.endCell, rowVariation, colVariation); // set the fcost of the cell
            relativeCell.type = cellType.OPEN; // set the type of the cell to open, since it has now been initially explored
            gridIn.addOpenCell(relativeCellRow, relativeCellCol); // add the new open cell to the grid's listing
            //gridIn.cells[relativeCellRow][relativeCellCol].debugInfo(); // debug code, probably want to remove in production or something professional like that (commented)
        }
        else if(relativeCellType == cellType.OPEN) { // third, check if the relative cell is already an open cell
            let tempParent = relativeCell.parent; // placeholder to replace parent in case fcost improvement fails
            relativeCell.parent = gridIn.openCells[openCellIndex]; // set temporary parent for determing potentially better fcost
            let experimentalFCost = fcost(relativeCell, gridIn.endCell, rowVariation, colVariation); // determine potential new fcost
            if(experimentalFCost < relativeCell.fcost) { // if the potential new fcost is better
                relativeCell.fcost = experimentalFCost; // set the fcost of the relative cell to the better fcost
            }
            else { // if the potential new fcost is worse
                gridIn.cells[relativeCellRow][relativeCellCol].parent = tempParent; // return the parent to its original, better state
            }
        }
    }
    gridIn.openCells[openCellIndex].type = cellType.CLOSED; // close the cell that was just explored from
    gridIn.removeOpenCell(openCellIndex); // remove the cell from the open list since it is now closed
}

function openAroundStartCell(gridIn) { // custom code to open cells around the start cell
    let relatives = getRelatives(gridIn, gridIn.startCell); // gets the array of vectors describing the positions in a grid around another position
    for(let i = 0; i < relatives.length; i++) { // iterate through each relative
        let rowVariation = relatives[i].x; // pull the row relative variation
        let colVariation = relatives[i].y; // pull the column relative variation
        let startRow = gridIn.startCell.row; // find the row of the cell being explored around
        let startCol = gridIn.startCell.col; // find the column of the cell being explored around
        let relativeCellRow = startRow + rowVariation; // find the row of the next relative cell to be looked at
        let relativeCellCol = startCol + colVariation; // find the column of the next relative cell to be looked at
        let relativeCell = gridIn.cells[relativeCellRow][relativeCellCol]; // find the next relative cell to be looked at
        let relativeCellType = relativeCell.type; // find the type of the relative cell (for later convenience)
        if(relativeCellType == cellType.EMPTY) { // check to make sure the cell to be opened is empty, not blocked
            relativeCell.parent = gridIn.startCell; // set the parent of the newly opened cell to the start cell
            relativeCell.gcost = gcost(relativeCell, rowVariation, colVariation); // set the gcost of the new cell
            relativeCell.hcost = hcost(relativeCell, gridIn.endCell); // set the hcost of the new cell
            relativeCell.fcost = fcost(relativeCell, gridIn.endCell, rowVariation, colVariation); //set the fcost of the new cell
            relativeCell.type = cellType.OPEN; // set the type of the newly opened cell to open
            gridIn.addOpenCell(relativeCellRow, relativeCellCol); // add the open cell to the grid's listing of open cells
            //relativeCell.debugInfo(); // debug code, probably want to remove in production or something professional like that
        }
    }
}