//This file contains both the structure of each cell and the definition for cell typing
class Cell {
    debugInfo() { // prints out generic debug info for broad debugging
        console.log("Cell -> row: " + this.row + ", col: " + this.col + ", type: " + this.type + "\n" 
        + "\tfcost: " + this.fcost + ", gcost: " + this.gcost + ", hcost: " + hcost + "\n");
    }
    constructor(row, col, type) { // constructor for cell given its row and column positions, as well as which type it is (type can be later modified)
        this.row = row;
        this.col = col;
        this.type = type;
    }
}

const cellType = { // used to determine what type a cell is, for example: whether you can move through a cell.
    EMPTY: 1,
    BLOCKED: 2,
    START: 3,
    OPEN: 4,
    CLOSED: 5,
    FINISH: 6,
    PATH: 7
}