function buildLine(gridIn) { // directly draws the path curve as it determines is necessary
    for(let i = 1; i < gridIn.pathCells.length; i++) {
        let point1 = new Vector(gridIn.pathCells[i-1].col, gridIn.pathCells[i-1].row);
        let point2 = new Vector(gridIn.pathCells[i].col, gridIn.pathCells[i].row);
        ctx.beginPath();
        ctx.globalAlpha=0.5;
        ctx.lineWidth = "3";
        ctx.strokeStyle = "#0099ff";
        ctx.moveTo(point1.x*gridIn.cellWidth + gridIn.cellWidth/2, point1.y*gridIn.cellHeight + gridIn.cellHeight/2);
        ctx.lineTo(point2.x*gridIn.cellWidth + gridIn.cellWidth/2, point2.y*gridIn.cellHeight + gridIn.cellHeight/2);
        ctx.stroke();
    }
    let endPoint = new Vector(gridIn.pathCells[0].col, gridIn.pathCells[0].row);
    let pixelX = endPoint.x*gridIn.cellWidth + gridIn.cellWidth/2;
    let pixelY = endPoint.y*gridIn.cellHeight + gridIn.cellHeight/2;
    ctx.beginPath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#0099ff";
    ctx.moveTo(pixelX, pixelY-6);
    ctx.lineTo(pixelX + 9, pixelY - 21);
    ctx.lineTo(pixelX - 9, pixelY - 21);
    ctx.lineTo(pixelX, pixelY-6);
    ctx.fill();
}