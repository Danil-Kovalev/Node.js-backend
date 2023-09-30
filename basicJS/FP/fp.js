getCSV = function(textCSV) {
    let text = textCSV.split("\n").filter((element) => /^(#?\d{0,2}\.\d{0,2})?,(#?\d{0,2}\.\d{0,2})?,(#?[a-zA-Z]*)?,(#?\d*)?,?$/g.test(element));
    let informationCity = [];
    text.map((elementText) => {
        let arrayCity = {};
        arrayCity.x = Number(elementText.match(/^(#?\d{0,2}\.\d{0,2})/g));
        arrayCity.y = Number(elementText.match(/(?<=,)#?\d{0,2}\.\d{0,2}/g).toString());
        arrayCity.name = elementText.match(/(?<=,)#?[a-zA-Z]*(?=,)/g).toString();
        arrayCity.population = Number(elementText.match(/(?<=,)#?\d*(?=,)/g));
        informationCity.push(arrayCity);
    });
    informationCity.sort((firstElement, secondElement) => firstElement.population < secondElement.population ? 1 : -1);
    let topCity = informationCity.slice(0, 9);

    return getParsedCSV = function(text) {
        return text;
    };
};