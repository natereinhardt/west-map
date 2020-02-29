// Converts text data into a cell array

function getCellArrayFromText(text) { // converts the cell array as formatted by ronan into a cell array in this code
    let cells = []; // instantiate cell array
    text = text.substr(1); // knock off the first bracket of the array
    text = text.replace(/\s/g, ''); // remove spaces
    while(text.search('\\[') != -1) { // continue running until no more '[' can be found (rows are removed each time they are read)
        let firstIndex = text.search('\\['); // start the row at the next opening bracket
        let secondIndex = text.search('\\]'); // end the row at the next closing bracket
        let horizontalLine = text.substr(firstIndex+1, secondIndex-1); // extract all material within the brackets
        cells[cells.length] = []; // instantiate the next row of the 2d array
        let values = horizontalLine.split(","); // splits the contents into a row of number values
        for(let i = 0; i < values.length; i++) { // iterate through the row of values
            cells[cells.length-1][i] = (Number(values[i])); // initialize each column within the row to the corresponding value in the list
        }
        text = text.substr(secondIndex+2); // remove the row that was being worked on, moving on to the next
    }
    return cells; // return the finished cell array
}