    let Validator = {

    validateEmail: function (str) {
            let regexp = /(^[^\.\-\+][a-zA-Z\d\.\-\+]{1,20})@([\w\d\.!\$\%\&\’\*\+\/\=\?\^\-]{1,15})\.(\w{1,5}$)/g;
            console.log(regexp.exec(str));
            return regexp.test(str);
        },

    validatePhone: function(str) {
        if (str.length <= 25) {
            let regexp = /^(\+\d{2})?[\s\-]*?\(?(\d[\s-]*?){3}\)?([\s-]?\d){7}$/g;
            return regexp.test(str);
        }
        else {
            return null;
        }
    },

    validatePassword: function(str) {
        let regexp = /^[a-z\dA-Z_]{8,}$/g;
        return regexp.test(str);
    }
}