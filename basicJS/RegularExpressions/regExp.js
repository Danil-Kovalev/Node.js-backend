    let Validator = {

    validateEmail: function (str) {
            let regexp = /(^[^\.\-\+][a-zA-Z\d\.\-\+]{1,20})@([\w\d\.!\$\%\&\’\*\+\/\=\?\^\-]{1,15})\.(\w{1,5}$)/g;
            return regexp.test(str);
        },

    validatePhone: function(str) {
        if (str.length <= 25) {
            let regexp = /^(\+\d{2})?[\s\-]*?\(?(\d[\s-]*?){3}\)?([\s-]?\d){7}$/g;
            return regexp.test(str);
        }
        else {
            return false;
        }
    },

    validatePassword: function(str) {
        let regexp = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([0-9a-zA-Z_?]){8,}/g;
        return regexp.test(str);
    }
}