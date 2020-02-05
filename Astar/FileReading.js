function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    var allText;
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    return allText;
    rawFile.send(null);
}

function getCellArrayFromText(text) {
    let cells = [];
    text = replaceAt(text, 0, "");
    while(text.search("[") != -1) {
        let firstIndex = text.search("[");
        let secondIndex = text.search("]");
        let horizontalLine = text.substr(firstIndex, secondIndex-1);
        cells[cells.length] = [];
        let values = horizontalLine.split(",");
        for(let i = 0; i < values.length; i++) {
            cells[cells.length-1][i] = values[i]+1;
        }
    }
}

function replaceAt(text, index, replacement) {
    return text.substr(0, index) + replacement + text.substr(index + replacement.length);
}