//defines the abstraction of a grid to be produced
class Grid {
    addLine(line) {
        this.lines[this.lines.length] = line;
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