function buildLine(gridIn) { // directly draws the path curve as it determines is necessary
    for(let i = 1; i < gridIn.pathCells.length; i++) {
        let point1 = new Vector(gridIn.pathCells[i-1].col, gridIn.pathCells[i-1].row);
        let point2 = new Vector(gridIn.pathCells[i].col, gridIn.pathCells[i].row);
        ctx.beginPath();
        ctx.globalAlpha=0.5;
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#4d91f0";
        ctx.moveTo(point1.x*gridIn.cellWidth + gridIn.cellWidth/2, point1.y*gridIn.cellHeight + gridIn.cellHeight/2);
        ctx.lineTo(point2.x*gridIn.cellWidth + gridIn.cellWidth/2, point2.y*gridIn.cellHeight + gridIn.cellHeight/2);
        ctx.stroke();
    }
}