getCSV = function(textCSV) {
    let text = textCSV.split("\n").filter((element) => /^(#?\d{2}\.\d{2})?,(#?\d{2}\.\d{2})?,(#?[a-zA-Z]])*?,(#?\d)*?,$/g.test(element));

    return getParsedCSV = function(text) {
        return text;
    };
};