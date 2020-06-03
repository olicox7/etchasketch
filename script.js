const container = document.querySelector("#container");
createGridDivs(10);
setGridLayout(10);

function createDiv(parentNode){
    newDiv = document.createElement("div");
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
    container.setAttribute("style",`grid-template-columns: ${gridTemplateText}; grid-template-rows: ${gridTemplateText}`)
}