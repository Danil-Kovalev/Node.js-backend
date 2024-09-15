import { loadIndexPage } from "./index.js";
import { getParameterByName } from './index.js';
import { global } from "../scripts/common.js";

$('.sidebar_item').click(function (event) {
    event.preventDefault();
    var filter = $(this).attr('data-filter');
    $('#search').val('');
    setSidebarActiveButton($(this), filter);
    (function () {
            var data = {
                filter: filter || 'new',
                offset: getParameterByName('offset'),
                limit: global.items_limit_on_page_load
            };
        loadIndexPage(data);
    }());
});

export function setSidebarActiveButton(activeElem, filterStringValue) {
    $('.sidebar_item').removeClass('active');
    if (activeElem) {
        activeElem.closest('a').addClass('active');
        return;
    } else {
        $('a[data-filter=' + filterStringValue + ']').addClass('active');
    }
}