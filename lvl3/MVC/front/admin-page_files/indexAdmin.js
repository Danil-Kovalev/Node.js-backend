import { view } from "../scripts/common.js";

// waiting load page and ask for an item
window.onload = function () {
    const logout = document.getElementById("logoutBtn")
    logout.addEventListener('click', logoutClick)
}

function logoutClick() {

    const url = 'http://localhost:3000/admin'

    // fill wrong data for accept status code 401
    const username = 'fakeUser';
    const password = 'randomPassword';
    var http = new XMLHttpRequest();

    // XHR send wrong request for accept statud code 401
    http.open("get", url, false, username, password);
    http.send("");

    // check status for logout
    if (http.status === 401) {
        view.showSuccess("Ви вийшли з акаунту");
        window.location.href = "/";
    } else {
        view.showError("Logout failed")
    }
}