addEventListener("mousemove", writePositionMouse); //event for mouse

//events for load page
addEventListener("load", checkLanguage);
addEventListener("load", checkGeolocation);
addEventListener("load", saveLocalBlock);
addEventListener("load", saveCookieBlock);
addEventListener("load", saveSessionBlock);

window.addEventListener("scrollend", addButtonBottom); //event for scroll window

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

//create image by link in input
function getImage() {
    let element = document.getElementById("image-input").value;
    let newElement = document.createElement("img");
    newElement.src = element;
    newElement.style.marginTop = "20px";
    document.body.insertBefore(newElement, document.getElementById("field-image"));
}

//create few images by link in input
function getFewImages() {
    let urlsImages = document.getElementById("few-images-input").value.split("\n");
    urlsImages.map(element => {
        let newElement = document.createElement("img");
        newElement.src = element;
        newElement.style.marginRight = "10px";
        newElement.style.marginTop = "10px";
        document.body.insertBefore(newElement, document.getElementById("field-images"));
    })
}

//check position mouse and write in page
function writePositionMouse(e) {
    let x = e.clientX;
    let y = e.clientY;
    document.getElementById("coordination").innerHTML = `X: ${x}, Y: ${y}`;
}

//check language in browser and write in page
function checkLanguage() {
    let langugage = navigator.language;
    document.getElementById("show-language").innerHTML = `Language: ${langugage}`;
}

//check geolocation user and write in page
function checkGeolocation() {
    navigator.geolocation.getCurrentPosition(element => {
        let info = document.getElementById("show-latitude-longtitude");
        info.innerHTML = `Ш: ${element.coords.latitude}, Д: ${element.coords.longitude}`;
    });
}

//set text in div to localStorage
function setTextLocalBlock() {
    let textLocalBlock = document.getElementById("local-block").innerHTML;
    localStorage.setItem("localBlock", textLocalBlock);
}

//set text in div to cookie
function setTextCookieBlock() {
    let textCookieBlock = document.getElementById("cookie-block").innerHTML;
    document.cookie = `cookieBlock=${textCookieBlock}`;
}

//set text in div to sessionStorage
function setTextSessionBlock() {
    let textSessionBlock = document.getElementById("session-block").innerHTML;
    sessionStorage.setItem("sessionBlock", textSessionBlock);
}

//save text in div by localStorage
function saveLocalBlock() {
    document.getElementById("local-block").innerHTML = localStorage.getItem("localBlock");
}

//save text in div by cookie
function saveCookieBlock() {
    let data = document.cookie.match(/(?<=(cookieBlock=)).*/g);
    document.getElementById("cookie-block").innerHTML = decodeURIComponent(data);
}

//save text in div by sessionStorage
function saveSessionBlock() {
    document.getElementById("session-block").innerHTML = sessionStorage.getItem("sessionBlock");
}

/**
 * Add button, when user scrolled to bottom pages and add event for button, which user clicked it or delete button,
 * if user scroll top page
 */
function addButtonBottom() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && document.getElementById("hidden-button") === null) {
        let newElement = document.createElement("button");
        newElement.id = "hidden-button";
        newElement.innerText = "Click me";
        newElement.addEventListener("click", () => {
            document.getElementById("black-square").scrollIntoView({block: "center", behavior: "smooth"});
        });
        document.body.insertBefore(newElement, document.getElementById("field-button"));
    }
    else if ((window.innerHeight + window.scrollY) < document.body.offsetHeight && document.getElementById("hidden-button") !== null) {
        document.getElementById("hidden-button").remove();
    }
}

//event, if user click big div, then show appropriate alert
function alertBigBlock() {
    alert("You clicked big block!");
}

//event, if user click little div, then show appropriate alert and blocking pop-up event
function alertLittleBlock() {
    alert("You clicked little block!");
    event.stopPropagation();
}

//show gray square full screen and blocking scroll, when user clicked button and hide square, when user clicked on square
function showGraySquare() {
    window.addEventListener("scroll", blockScrollWindow);
    let graySquare = document.createElement("div");
    graySquare.style.position = "fixed";
    graySquare.style.top = 0;
    graySquare.style.left = 0;
    graySquare.style.width = "100%";
    graySquare.style.height = "100%";
    graySquare.style.backgroundColor = "gray";
    graySquare.style.opacity = 0.5;
    graySquare.addEventListener("click", () => {
        window.removeEventListener("scroll", blockScrollWindow);
        graySquare.remove();
    })
    document.body.insertBefore(graySquare, document.getElementById("field-biggest-square"));
}

//blocking scroll, when user sees gray square
function blockScrollWindow() {
    window.scrollTo({top: document.body.offsetHeight});
}