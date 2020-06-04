const container = document.querySelector("#container");
createGridDivs(16);
setGridLayout(16);

let gridSquares = document.querySelectorAll(".gridSquare");
gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseover', setBlackMode)) 

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", resetResize);

const blackButton = document.querySelector("#blackButton");
const colorButton = document.querySelector("#colorButton");
const transparencyButton = document.querySelector("#transparencyButton");

blackButton.addEventListener("click",setBlackMode);
colorButton.addEventListener("click",setColorMode);
transparencyButton.addEventListener("click",setTransparentMode);

function createDiv(parentNode){
    newDiv = document.createElement("div");
    newDiv.classList.add("gridSquare");
    parentNode.appendChild(newDiv);
}

function createGridDivs(gridSize){
    let numberOfDivs = gridSize ** 2;
    for(i=0; i < numberOfDivs; i++){
        createDiv(container);
    }
}

function setGridLayout(gridSize){
    let gridTemplateText = ''
    for(i=0; i < gridSize; i++){
        if(i === gridSize - 1){
            gridTemplateText += "1fr"
        } else {
            gridTemplateText += "1fr "
        }
    }
    container.setAttribute("style",`grid-template-columns: ${gridTemplateText};
    grid-template-rows: ${gridTemplateText};
    width: ${container.clientHeight}px;`);
}

function resetResize(){
    let gridSize = prompt('Enter the number of squares per edge.', '16');
    createGridDivs(gridSize);
    setGridLayout(gridSize);
    gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(gridSquare => gridSquare.style["background-color"] = "");
    if(colorButton.checked) setColorMode()
    else if (blackButton.checked) setBlackMode()
    else setTransparentMode()
}



function setColorMode(){
    gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(gridSquare => {
        if(gridSquare.style["background-color"] != ""){
            gridSquare.setAttribute("style",`background-color: rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`);
        }
    });
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener("mouseover", blackBackgroundColor));
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener("mouseover", setBlackMode));
    gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", randomBackgroundColor));
}

function setBlackMode(){
    gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(gridSquare => {
        if(gridSquare.style["background-color"] != ""){
            gridSquare.setAttribute("style",`background-color: black`);
        }
    });
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener("mouseover", randomBackgroundColor));
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener('mouseover', setBlackMode));
    gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", blackBackgroundColor));
}

function randomInt(maxNumber){
    return Math.floor(Math.random() * (maxNumber + 1));
}

function blackBackgroundColor(e){
    this.setAttribute("style","background-color: black")
}

function randomBackgroundColor(e){
    this.setAttribute("style",`background-color: rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`)
}

function transparentBackgroundColor(e){
    let transparencyValue = getTransparencyValue(this) || 0;
    if (transparencyValue == 10) return
    this.setAttribute("style",`background-color: black; opacity: ${++transparencyValue / 10}`)
}

function setTransparentMode(){
    gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(gridSquare => {
        if(gridSquare.style["background-color"] != ""){
            gridSquare.setAttribute("style",`background-color: black; opacity: 0.1`);
        }
    });
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener("mouseover", blackBackgroundColor));
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener("mouseover", randomBackgroundColor));
    gridSquares.forEach(gridSquare => gridSquare.removeEventListener("mouseover", setBlackMode));
    gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover",transparentBackgroundColor));
}

function getTransparencyValue(div){
    let currentValue = div.getAttribute("style","opacity");
    if (currentValue == "background-color: black; opacity: 1") return 10;
    if (currentValue == null || Number(currentValue) == NaN) return 0;
    let newValue = currentValue.slice(-1);
    return +newValue;
}
