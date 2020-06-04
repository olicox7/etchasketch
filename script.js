const container = document.querySelector("#container");
createGridDivs(16);
setGridLayout(16);

let gridSquares = document.querySelectorAll(".gridSquare");
gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseover', addHoverClass)) 

const resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", resetResize);

const blackButton = document.querySelector("#blackButton");
const colorButton = document.querySelector("#colorButton");
const transparencyButton = document.querySelector("#transparencyButton");

colorButton.addEventListener("click",setColorMode);

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

function addHoverClass(e){
    this.classList.add("gridSquareHover");
}

function resetResize(){
    let gridSize = prompt('Enter the number of squares per edge.', '16');
    createGridDivs(gridSize);
    setGridLayout(gridSize);
    gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(gridSquare => gridSquare.classList.remove("gridSquareHover"));
    gridSquares.forEach(gridSquare => gridSquare.addEventListener('mouseover', addHoverClass));
}



function setColorMode(){
    gridSquares = document.querySelectorAll(".gridSquare");
    gridSquares.forEach(gridSquare => gridSquare.addEventListener("mouseover", randomBackgroundColor))
}

function randomInt(maxNumber){
    return Math.floor(Math.random() * (maxNumber + 1));
}

function randomBackgroundColor(e){
    this.setAttribute("style",`background-color: rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`)
}