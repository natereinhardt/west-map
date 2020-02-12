function formatGrid(gridIn) {
    let output = "";
    output += "[";
    for(let row = 0; row < gridIn.height; row++) {
        output += "[";
        for(let col = 0; col < gridIn.width; col++) {
            output += gridIn.cells[row][col];
            if(col!= gridIn.width-1) {
                output += ", ";
            }
        }
        if(row!=gridIn.height-1) {
            output += "], ";
        }
        else {
            output += "]";
        }
    }
    output += "]";
    console.log(output);
}