import { view } from "../scripts/common.js";
import { doAjaxQuery } from "../scripts/common.js";

// waiting load page and ask for an item
window.onload = function () {
    const logout = document.getElementById("logout-btn")
    logout.addEventListener('click', logoutClick)
}

/**
 * function is called when the button click event is triggered and sends a request with incorrect data to log out of the account
 */
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

$("#add-btn").on('click', addBook) //event for button, which have function for data processing and send request to server with it data

/**
 * Function get data from user, which entered data to fields. Check empty fields and send data to server
 * @returns null, when incorrect data
 */
function addBook() {
    let nameValue = $('#book-name').val();
    let yearValue = $('#year-publication').val();
    let pagesValue = $('#book-pages').val();
    let descriptionValue = $('#description-book').val();
    let firstAuthorValue = $('#first-author').val();
    let secondAuthorValue = $('#second-author').val() || null;
    let thirdAuthorValue = $('#third-author').val() || null;

    event.preventDefault();

    if (!nameValue) {
        view.showError('Введіть назву книги')
        return
    }
    else if (!yearValue) {
        view.showError('Введіть рік книги')
        return
    }
    else if (!pagesValue) {
        view.showError('Введіть кількість сторінок книги')
        return
    }
    else if (!firstAuthorValue) {
        view.showError('Введіть першого автора книги')
        return
    }
    else if (!descriptionValue) {
        view.showError('Введіть опис книги')
        return
    }

    let data = {
        name: nameValue,
        year: yearValue,
        pages: pagesValue,
        description: descriptionValue,
        firstAuthor: firstAuthorValue,
        secondAuthor: secondAuthorValue,
        thirdAuthor: thirdAuthorValue
    }

    doAjaxQuery('POST', '/admin/api/v1/book', data, function (res) {
        if (res.success) {
            view.showSuccess('Книга успішно додана')
        }
        else {
            view.showError('Книга не додана');
        }
    });
}

$('#form-img').on('change', loadPicture) // event for load image to him field

/**
 * Check files from input field and load to image field
 */
function loadPicture() {
    if (this.files && this.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
            $('#field-img').attr('src', e.target.result)
        };
        reader.readAsDataURL(this.files[0]);
    }
}