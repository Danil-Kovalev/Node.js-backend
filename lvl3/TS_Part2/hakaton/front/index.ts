enum Click {
    Plus = "plus",
    Minus = "minus"
}

function clickPlus() {
    let plusInfo: HTMLElement | null = document.getElementById("plusInfo");

    fetch(`http://localhost:8080/${Click.Plus}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PUT"
    }).then(res => res.json()).then(res => {
        plusInfo!.innerHTML = `Click plus: ${res.count}`
    })
}

function clickMinus() {
    let minusInfo: HTMLElement | null = document.getElementById("minusInfo");

    fetch(`http://localhost:8080/${Click.Minus}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    }).then(res => res.json()).then(res => {
        minusInfo!.innerHTML = `Click minus: ${res.count}`
    })
}