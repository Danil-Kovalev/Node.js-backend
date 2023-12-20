import { doAjaxQuery } from '../scripts/common.js'
import { view } from '../scripts/common.js';
import { global } from '../scripts/common.js';
import { setSidebarActiveButton } from './sidebar.js';

var drawItemsOnScroll
export var isScrollRunning = false;
// console.log(isScrollRunning);

$(document).ready(function () {

    (function () {

        var data = {
            filter: getParameterByName('filter') || global.filter,
            offset: getParameterByName('offset'),
            limit: getParameterByName('count') || global.items_limit_on_page_load
        };

        setSidebarActiveButton(null, data.filter);
        doAjaxQuery('GET', '/api/v1/books', data, function (res) {
            view.addBooksItems(res.data.books, true);
            drawItemsOnScroll = initDrawItemsOnScroll(res.data.total.amount);
            if (localStorage.getItem('h')) {
                $(window).scrollTop(localStorage.getItem('h'));
                localStorage.removeItem('h');
            }
            checkCountBooks(res.data.books.length, res.data.total.amount)
        });
    }());

    $('#content').on('click', '.book', function () {
        localStorage.setItem('h', $(window).scrollTop());
    });

    $('#nextBtn').on('click', function () {
        drawItemsOnScroll();
        hideElement($(this))
        showElement($('#prevBtn'))
    })

    $('#prevBtn').on('click', function () {
        drawItemsOnScroll();
        hideElement($(this))
        showElement($('#nextBtn'))
    })

    // $(document).scroll(function () {
    //     if ((( $(document).height() - $(window).scrollTop() ) < ( 2 * $(window).height() )) && !isScrollRunning) {
    //         isScrollRunning = true;
    //         drawItemsOnScroll();
    //     }
    // });
});

export function getParameterByName(name, url) {
    if (!url) url = $(location).attr('href');
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var initDrawItemsOnScroll = function (maxItems) {
    var maxNumOfItems = maxItems,
        limit = global.number_of_items_onscroll,
        offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;

    return function () {
        // offset = parseInt(getParameterByName('count')) || global.items_limit_on_page_load;
        if (offset < maxNumOfItems) {
            var data = {
                'filter': getParameterByName('filter') || "new",
                'offset': offset,
                'limit': limit
            };
            $("#loading").slideDown();
            doAjaxQuery('GET', '/api/v1/books', data,
                function (res) {
                    $("#loading").slideUp();
                    isScrollRunning = false;
                    view.addBooksItems(res.data.books, false);
                    changeHistoryStateWithParams("replace", res.data.filter, res.data.offset);
                });
            offset += limit;
        }
    }
};

export function loadIndexPage(reqData) {
    doAjaxQuery('GET', '/api/v1/books', reqData, function (res) {
        view.addBooksItems(res.data.books, true);
        changeHistoryStateWithParams('push', res.data.filter, res.data.offset);
        drawItemsOnScroll = initDrawItemsOnScroll(res.data.total.amount);
    });
}

function changeHistoryStateWithParams(action, filter, offset) {
    if (action = '') {
        return;
    }

    offset = parseInt(offset);
    var count = offset ? global.number_of_items_onscroll : global.items_limit_on_page_load;
    var queryString = '?filter=' + filter + '&count=' + (offset + count);
    if (action === 'push') {
        window.history.pushState('','',queryString);
    } else {
        window.history.replaceState('','',queryString);
    }
}

function checkCountBooks(countBooks, totalBooks) {
    if (countBooks < totalBooks) {
        showElement($('#nextBtn'))
    }
    else if (countBooks === totalBooks) {
        hideElement($('#nextBtn'))
        showElement($('#prevBtn'))
    }
}

function showElement(element) {
    event.preventDefault();
    $(element).css('visibility', 'visible')
}

function hideElement(element) {
    event.preventDefault();
    $(element).css('visibility', 'hidden')
}