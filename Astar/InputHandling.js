let startPassed = false;
let endPassed = false;

c.onclick = function() {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    if(!startPassed) {
        myGrid.passStart(mouseX, mouseY, c.width, c.height);
        startPassed = true;
    }
    else if(!endPassed) {
        myGrid.passEnd(mouseX, mouseY, c.width, c.height);
        endPassed = true;
    }
    else {
        myGrid.passChange(mouseX, mouseY);
    }
}

c.onkeypress = function() {
    let key = event.key;
    if(key == 'e') {
        aStarIterate(myGrid);
    }
}