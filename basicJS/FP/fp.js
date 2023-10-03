getCSV = function(CSV) {
    let text = CSV.split("\n").filter((element) => /^(#?\d{0,2}\.\d{0,2})?,(#?\d{0,2}\.\d{0,2})?,(#?[a-zA-Z]*)?,(#?\d*)?,?$/g.test(element));
    let informationCity = [];
    text.map((elementText) => {
        informationCity.push({
        x: Number(elementText.match(/^(#?\d{0,2}\.\d{0,2})/g)),
        y: Number(elementText.match(/(?<=,)#?\d{0,2}\.\d{0,2}/g).toString()),
        name: elementText.match(/(?<=,)#?[a-zA-Z]*(?=,)/g).toString(),
        population: Number(elementText.match(/(?<=,)#?\d*(?=,)/g))});
    });
    informationCity.sort((firstElement, secondElement) => firstElement.population < secondElement.population ? 1 : -1).slice(0, 9);
    let ratingCities = informationCity.reduce((previousElement, currentElement, indexElement) => {
        return previousElement[currentElement.name] = {population: currentElement.population, rating: indexElement + 1}, previousElement;
    },{});
    return () => {
        let pattern = "\nName (Xst place in the top 10 largest cities in Ukraine, population Y people)";
        let fullText = [];
        Object.entries(ratingCities).forEach(([key, value]) => {
        fullText.push(pattern.replace(/Name/g, key).replace(/X/g, value.rating).replace(/Y/g, value.population));
        });
        return fullText.toString();
    };
};