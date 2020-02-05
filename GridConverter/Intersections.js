//Calculates the list of cells a given line passes through 
//(In desperate need of refactoring-- first step should be to refactor line1, line2, line3, line4 line into a single function with parameters)

function getIntersections(line, grid) { // gets each cell that a line passes through
    //this makes use of a vector intersection algorithm described well here: https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
    let p = new Point(line.x1, line.y1);
    let r = new Point(line.x2-line.x1, line.y2-line.y1);
    let intersectedCells = [];
    for(let row = 0; row < grid.height; row++) { // the code in this loop produces a list of intersected cells. baggage level high because big algorithm
        for(let col = 0; col < grid.width; col++) {
            let line1 = new Line(grid.cellWidth*col, grid.cellHeight*row, grid.cellWidth*col+grid.cellWidth, grid.cellHeight*row);// Top edge of cell
            //console.log("line1: " + "(" + line1.x1 + ", " + line1.y1 + "), (" + line1.x2 + ", " + line1.y2 + ")");
            let q = new Point(line1.x1, line1.y1);
            let s = new Point(line1.x2-line1.x1, line1.y2 - line1.y1);
            let t = crossProduct(subtract(q, p), s) / crossProduct(r, s);
            let u = crossProduct(subtract(p, q), r) / crossProduct(s, r);
            console.log("t: " + t.x + "," + t.y + "\n" + "u: " + u.x + "," + u.y);
            if(crossProduct(r, s)== 0 && crossProduct(subtract(q, p), r) == 0) { // indicates collinearity
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            else if(0 <= t && t <= 1 && 0 <= u && u <= 1) { // indicates a standard intersection
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            let line2 = new Line(grid.cellWidth*col+grid.cellWidth, grid.cellHeight*row, grid.cellWidth*col+grid.cellWidth, grid.cellHeight*row+grid.cellHeight);// Right edge of cell
            q = new Point(line2.x1, line2.y1);
            s = new Point(line2.x2-line2.x1, line2.y2 - line2.y1);
            t = crossProduct(subtract(q, p), s) / crossProduct(r, s);
            u = crossProduct(subtract(p, q), r) / crossProduct(s, r);
            if(crossProduct(r, s)== 0 && crossProduct(subtract(q, p), r) == 0) { // indicates collinearity
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            else if(0 <= t && t <= 1 && 0 <= u && u <= 1) { // indicates a standard intersection
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            let line3 = new Line(grid.cellWidth*col, grid.cellHeight*row+grid.cellHeight, grid.cellWidth*col+grid.cellWidth, grid.cellHeight*row+grid.cellHeight);// Bottom edge of cell
            q = new Point(line3.x1, line3.y1);
            s = new Point(line3.x2-line3.x1, line3.y2 - line3.y1);
            t = crossProduct(subtract(q, p), s) / crossProduct(r, s);
            u = crossProduct(subtract(p, q), r) / crossProduct(s, r);
            if(crossProduct(r, s)== 0 && crossProduct(subtract(q, p), r) == 0) { // indicates collinearity
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            else if(0 <= t && t <= 1 && 0 <= u && u <= 1) { // indicates a standard intersection
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            let line4 = new Line(grid.cellWidth*col, grid.cellHeight*row+grid.cellHeight, grid.cellWidth*col, grid.cellHeight*row);// Left edge of cell
            q = new Point(line4.x1, line4.y1);
            s = new Point(line4.x2-line4.x1, line4.y2 - line4.y1);
            t = crossProduct(subtract(q, p), s) / crossProduct(r, s);
            u = crossProduct(subtract(p, q), r) / crossProduct(s, r);
            if(crossProduct(r, s)== 0 && crossProduct(subtract(q, p), r) == 0) { // indicates collinearity
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
            else if(0 <= t && t <= 1 && 0 <= u && u <= 1) { // indicates a standard intersection
                intersectedCells[intersectedCells.length] = new Point(row, col);
                continue;
            }
        }
    }
    return intersectedCells;
}

function crossProduct(a, b) { // a and b points
    return (a.x*b.y - a.y*b.x); // (ax*by - ay*bx)
}

function subtract(a, b) { // a and b points
    return(new Point(a.x-b.x, a.y-b.y));
}
