//This is the abstraction for the grid of cells
class Grid {
    setDimensions() {
        this.width = cells.length;
        this.height = cells[0].length;
    }
    addOpenCell(row, col) { // adds an open cell to the list of open cells in the grid
        this.openCells[this.openCells.length] = this.cells[row][col];
    }
    removeOpenCell(openCellIndex) { // removes open cells once they become closed
        for(let i = openCellIndex; i < this.openCells.length-1; i++) {
            this.openCells[i] = this.openCells[i+1];
        }
        this.openCells.length -= 1;
    }
    passStart(x, y, screenWidth, screenHeight) { // places the starting square on the grid
        cellWidth = Math.floor(screenWidth / this.width);
        let cellX = Math.floor(x/cellWidth);
        cellHeight = Math.floor(screenHeight / this.height);
        let cellY = Math.floor(y/cellHeight);
        this.cells[cellY][cellX].type = cellType.START;
        this.startCell = this.cells[cellY][cellX];
    }
    passEnd(x, y, screenWidth, screenHeight) { // places the ending square on the grid
        cellWidth = Math.floor(screenWidth / this.width);
        let cellX = Math.floor(x/cellWidth);
        cellHeight = Math.floor(screenHeight / this.height);
        let cellY = Math.floor(y/cellHeight);
        this.cells[cellY][cellX].type = cellType.FINISH;
        this.endCell = this.cells[cellY][cellX];
    }
    passChange(x, y, screenWidth, screenHeight) { // changes any blocks between blocked and empty status
        let cellX = Math.floor(x/cellWidth);
        let cellY = Math.floor(y/cellHeight);
        if(this.cells[cellY][cellX].type == cellType.BLOCKED) {
            this.cells[cellY][cellX].type = cellType.EMPTY; 
        }
        else if(this.cells[cellY][cellX].type == cellType.EMPTY) {
            this.cells[cellY][cellX].type = cellType.BLOCKED; 
        } 
    }
    initializeFromNumbers(numbers) {
        for(let row = 0; row < numbers.length; row++) {
            for(let col = 0; col < numbers[0].length; col++) {
                this.cells[row][col] = new Cell(row, col, numbers[row][col]);
            }
        }
    }
    initializeRandom(weight) { // sets all of the cells, randomly, to either empty or blocked, with an optional weight from 0 to 1, where 1 is all empty and 0 is all blocked
        for(let row = 0; row < this.height; row++) {
            this.cells[row] = [];
            for(let col = 0; col < this.width; col++) {
                if(Math.random()>weight) { // Math.random() produces a random value from 0 to 1
                    this.cells[row][col] = new Cell(row, col, cellType.BLOCKED);
                }
                else {
                    this.cells[row][col] = new Cell(row, col, cellType.EMPTY);
                }
            }
        }
    }
    constructor(height, width) { // sets the width and height of the grid
        this.height = height;
        this.width = width;
        this.cells = [];
        this.openCells = [];
        this.solved = false;
    }
}