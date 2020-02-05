function aStarIterate(gridIn) {
    if(gridIn.openCells.length > 0 && !gridIn.solved) {
        let lowestFCost = gridIn.openCells[0].fcost;
        let lowestFCostIndex = 0;
        if(gridIn.openCells.length>1) {
            for(let i = 0; i < gridIn.openCells.length; i++) {
                if(gridIn.openCells[i].fcost < lowestFCost) {
                    lowestFCost = gridIn.openCells[i].fcost;
                    lowestFCostIndex = i;
                }
            }
        }
        openAroundOpenCell(gridIn, lowestFCostIndex);
    }
    else if(!gridIn.solved) {
        openAroundStartCell(gridIn);
    }
}

function openAroundOpenCell(gridIn, openCellIndex) {
    let relatives = getRelatives(gridIn, gridIn.openCells[openCellIndex]);
    for(let i = 0; i < relatives.length; i++) {
        let rowVariation = relatives[i].x;
        let colVariation = relatives[i].y;
        let startRow = gridIn.openCells[openCellIndex].row;
        let startCol = gridIn.openCells[openCellIndex].col;
        let relativeCellRow = startRow + rowVariation;
        let relativeCellCol = startCol + colVariation;
        let relativeCell = gridIn.cells[relativeCellRow][relativeCellCol];
        let relativeCellType = relativeCell.type;
        if(relativeCellType == cellType.FINISH) {
            gridIn.solved = true;
            let recursingCell = gridIn.openCells[openCellIndex];
            while(recursingCell.type!=cellType.START) {
                recursingCell.type = cellType.PATH;
                recursingCell = recursingCell.parent;
            }
            return;
        }
        else if (relativeCellType == cellType.EMPTY) {
            relativeCell.parent = gridIn.openCells[openCellIndex];
            relativeCell.gcost = gcost(relativeCell, rowVariation, colVariation);
            relativeCell.hcost = hcost(relativeCell, gridIn.endCell);
            relativeCell.fcost = fcost(relativeCell, gridIn.endCell, rowVariation, colVariation);
            relativeCell.type = cellType.OPEN;
            gridIn.addOpenCell(relativeCellRow, relativeCellCol);
            gridIn.cells[relativeCellRow][relativeCellCol].debugInfo(); // debug code, probably want to remove in production or something professional like that
        }
        else if(relativeCellType == cellType.OPEN) {
            let tempParent = relativeCell.parent;
            relativeCell.parent = gridIn.openCells[openCellIndex];
            let experimentalFCost = fcost(relativeCell, gridIn.endCell, rowVariation, colVariation);
            if(experimentalFCost < relativeCell.fcost) {
                relativeCell.fcost = experimentalFCost;
            }
            else {
                gridIn.cells[relativeCellRow][relativeCellCol].parent = tempParent;
            }
        }
    }
    gridIn.openCells[openCellIndex].type = cellType.CLOSED;
    gridIn.removeOpenCell(openCellIndex);
}

function openAroundStartCell(gridIn) {
    let relatives = getRelatives(gridIn, gridIn.startCell);
    for(let i = 0; i < relatives.length; i++) {
        let rowVariation = relatives[i].x;
        let colVariation = relatives[i].y;
        let startRow = gridIn.startCell.row;
        let startCol = gridIn.startCell.col;
        let relativeCellRow = startRow + rowVariation;
        let relativeCellCol = startCol + colVariation;
        let relativeCell = gridIn.cells[relativeCellRow][relativeCellCol];
        let relativeCellType = relativeCell.type;
        if(relativeCellType == cellType.EMPTY) {
            relativeCell.parent = gridIn.startCell;
            relativeCell.gcost = gcost(relativeCell, rowVariation, colVariation);
            relativeCell.hcost = hcost(relativeCell, gridIn.endCell);
            relativeCell.fcost = fcost(relativeCell, gridIn.endCell, rowVariation, colVariation);
            relativeCell.type = cellType.OPEN;
            gridIn.addOpenCell(relativeCellRow, relativeCellCol);
            relativeCell.parent = gridIn.startCell;
            relativeCell.debugInfo(); // debug code, probably want to remove in production or something professional like that
        }
    }
}