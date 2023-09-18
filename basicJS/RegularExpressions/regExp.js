    let Validator = {

    validateEmail: function (str) {
            let regexp = /(^[^\.\-\+][a-zA-Z\d\.\-\+]{1,20})@([\w\d\.!\$\%\&\’\*\+\/\=\?\^\-]{1,15})\.(\w{1,5}$)/g;
            return regexp.test(str);
        },

    validatePhone: function(str) {
        if (str.length <= 25) {
            // ([\s\-]*?\d{7}[\s\-]*?)
            let regexp = /^(\+\d{2})?[\s\-]*?(\(?\d{3}[\s\-]*?\)?)/g;
            return regexp.test(str);
        }
        else {
            return null;
        }
    },

    validatePassword: function(str) {
        let regexp;
        return regexp.test(str);
    }
}