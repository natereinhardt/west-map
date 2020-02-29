//defines the abstraction of a grid to be produced
class Grid {
    addLine(line) { // adds a line to the grid's array of lines
        this.lines[this.lines.length] = line;
    }
    setDimensions() { // set the dimension values of the grid based on the dimensions of the cell array
        this.width = cells.length;
        this.height = cells[0].length;
    }

    constructor(width, height, cellWidth, cellHeight) {
        this.width = width;
        this.height = height;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.lines = [];
        this.points = [];
        this.cells = [];
        for(let i = 0; i < width; i++) { // this for loop populates the grid with 0's denoting empty cells (1's denote blocked cells)
            this.cells[i] = [];
            for(let j = 0; j < height; j++) {
                this.cells[i][j] = 1;
            }
        }
    }
}