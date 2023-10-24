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
    return (text) => {
        let pattern = "Name (Xst place in the top 10 largest cities in Ukraine, population Y people)";
        Object.entries(ratingCities).forEach(([key, value]) => {
            if (text.includes(key)) {
                text = text.replaceAll(key, pattern.replace(/Name/g, key).replace(/X/g, value.rating).replace(/Y/g, value.population));
            }
        });
        return text.toString();
    };
};

let text = getCSV("44.38,34.33,Kyiv,2884000000,\n49.46,30.17,Kropyvnytskyi,226491,\n54.13,43.90,Mykolayiv,486267,\n49.54,28.49,Kherson,289697," + 
"\n21.34,54.86,Cherkasy,279074,\n12.54,31.53,Zaporizhya,746749,\n54.12,75.32,Vinnytsia,370834,\n79.14,62.23,Kryvyi Rih,646748," + 
"\n75.12,56.87,Zhytomyr,261624,\n65.12,57.23,Uzhhorod,115542,\n54.76,56.23,Mukachevo,85903");

let fullText = `Kropyvnytskyi – це батьківщина українського професійного театру.\nKyiv - дивно красиве місто, яке прекрасне незалежно від пори року.
Mykolayiv має найдовшу пішохідну вулицю в Україні.\nМісто Kherson побудований на катакомбах.\nCherkasy мали замкову гору.
Zaporizhya – місто, в якому досі відчувається козацький дух, попри сучасні забудову й індустріальні підприємства.
Vinnytsia - місто танцюючих фонтанів.\nZhytomyr був третім містом України, в якому з’явився трамвай.
Kryvyi Rih є одним із найдовших міст у всьому світі: його протяжність становить 126 кілометрів.
Якщо древній Uzhhorod – це серце Закарпаття, то Mukachevo – його душа`;

console.log(text(fullText));