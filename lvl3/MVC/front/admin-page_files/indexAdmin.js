import { view } from "../scripts/common.js";
import { doAjaxQuery } from "../scripts/common.js";
import { global } from "../scripts/common.js";

/**
 * Send request to server to get the first books and draw them in the table.
 * After draw elements for pagination and set active first element
 */
$(document).ready(function () {

    (function () {

        var data = {
            offset: 0,
            limit: global.items_limit_on_admin_page_load
        };

        doAjaxQuery('GET', '/admin/api/v1/books', data, function (res) {
            view.addBooksList(res.data.books);
            let amountPages = Math.ceil(res.data.total.amount / global.items_limit_on_admin_page_load);
            view.addPaginationElements(amountPages);
            setPageActive(null, 1);
        });
    }());
});

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
        window.location.href = "/auth";
    } else {
        view.showError("Logout failed")
    }
}

/**
 * Send request with id book to server and delete book
 */
$(document).on('click', '.delete-btn', function (event) {
    event.preventDefault();
    let index = $(this).attr('index-btn');

    let data = {
        id: Number(index)
    };

    fetch('http://localhost:3000/admin/api/v1/book', {
        method: 'DELETE',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).then(response => {
        if (response.success) {
            view.showSuccess('Книга успішно видалена');
            window.location.href = "/admin";
        }
        else {
            view.showError('Книга не видалена')
        }
    })
});

/**
 * Hangs an event on a click on a pagination element.
 * Sets active pressed element and forms data request to server to get books depending on the pressed element.
 * Draw books in the table
 */
$(document).on('click', '.page-link', function (event) {
    event.preventDefault();
    let page = $(this).attr('page');
    setPageActive($(this), page);
    let data = {
        offset: global.items_limit_on_admin_page_load * (page - 1),
        limit: global.items_limit_on_admin_page_load
    };
    doAjaxQuery('GET', '/admin/api/v1/books', data, function (res) {
        view.addBooksList(res.data.books);
    })
});

/**
 * Sets active element.
 * First deletes all existing active elements and then sets new active element: if element exist, then set active him, else set by parameter page
 * @param {*} element pressed element
 * @param {*} page number of the clicked element
 */
function setPageActive(element, page) {
    $('.page-link').removeClass('active');
    if (element) {
        element.closest('a').addClass('active');
    }
    else {
        $('a[page=' + page + ']').addClass('active');
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

    let fileData = $("#form-img").prop('files')[0];
    let formData = new FormData();
    formData.append('new-img', fileData);

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
    else if(!fileData) {
        view.showError('Додайте картинку')
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

    $.ajax({
        type: 'POST',
        url: '/admin/api/v1/image',
        enctype: 'multipart/form-data',
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            if (!res.success) {
                view.showError(res.msg);
                return;
            }
            callback(res);
        },
        error: function (jqXHR, textStatus) {
            view.showError('Помилка ' + textStatus);
        }
    });

    doAjaxQuery('POST', '/admin/api/v1/book', data, function (res) {
        if (res.success) {
            view.showSuccess('Книга успішно додана');
            window.location.href = "/admin";
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