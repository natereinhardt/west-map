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
        this.id = 0;
    }
}

const cellType = { // used to determine what type a cell is, for example: whether you can move through a cell.
    EMPTY: 1, // Nothing is blocking the path
    BLOCKED: 2, // Something is blocking the path
    START: 3, // Start of pathfinding
    OPEN: 4, // A cell has been opened for exploration
    CLOSED: 5, // A cell has been closed after exploration
    FINISH: 6, // The cell is the finish for pathfinding
    PATH: 7, // The cell has been discovered as a path
    TARGET: 8 // Special finish cell for a target with an id that must be matched (like in searching for rooms)
}