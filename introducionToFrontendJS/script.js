// hide black square with CSS
function hideCSS() {
    document.getElementById("black-square").style.display = "none";
};

// hide black square with JS
function hideJS() {
    document.getElementById("black-square").remove();
}

// hide black square with CSS + JS
function hideCSSandJS() {
    document.getElementById("black-square").style.display = "none";
}

//hide and show black square
function hideAndShow() {
    let element = document.getElementById("black-square");
    element.style.display != "none" ? element.style.display = "none" : element.style.display = "";
}

//hide and show all black squares
function hideAndShowAll() {
    let element = document.getElementsByClassName("same-squares");
    for (let i = 0; i < element.length; i++) {
        element[i].style.display != "none" ? element[i].style.display = "none" : element[i].style.display = "";
    }
}

//hide and show entered element
function hideAndShowSelector() {
    let inputElement = document.getElementById("input-selector").value;
    let element = document.querySelectorAll(inputElement);
    for (let i = 0; i < element.length; i++) {
        element[i].style.display != "none" ? element[i].style.display = "none" : element[i].style.display = "";
    }
}

let repeatClick = false; //checking for repeated clicks on the yellow square

//show hello if first click on the yellow square and hide yellow square if repeated click
function showOrHide() {
    if (!repeatClick) {
        document.getElementById("yellow-square").addEventListener("click", showHello());
        document.getElementById("yellow-square").innerHTML = "Click me again";
        repeatClick = true;
    }
    else {
        document.getElementById("yellow-square").removeEventListener("click", showHello);
        document.getElementById("yellow-square").addEventListener("click", hideSquare());
    }
}

//show hello before click on the yellow square
function showHello() {
    alert("Привіт");
}

//hide yellow square before repeat click
function hideSquare() {
    document.getElementById("yellow-square").style.display = "none";
}

//if mouse is over button, then show red square
function mouseOverButton() {
    document.getElementById("red-square").style.opacity = 1;
    document.getElementById("magic-button").innerHTML = "Take off me";
}

//if mouse is out button, then hide red square
function mouseOutButton() {
    document.getElementById("red-square").style.opacity = 0;
    document.getElementById("magic-button").innerHTML = "Point at me";
}

//shows green rectangle, when user focuses on input
function focusInput() {
    document.getElementById("green-rectangle").style.opacity = 1;
}

//hide green rectangle, when user enters into the input
function enterIntoInput() {
    document.getElementById("green-rectangle").style.opacity = 0;
}

function getImage() {
    let element = document.getElementById("image-input").value;
    document.querySelector("img#loaded-picture").src = element;
}