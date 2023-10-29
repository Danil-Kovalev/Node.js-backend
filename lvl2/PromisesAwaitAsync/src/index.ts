import fetch from 'node-fetch';

//1
const response = await fetch("https://api.ipify.org?format=json");
const data: any = await response.json();

console.log(`First task: ${data.ip}`);

//2
async function getId() {
    const response = await fetch("https://api.ipify.org?format=json");
    return await response.json();
}

const data2: any = await getId();
console.log(`Second task: ${data2.ip}`);

//3.1
async function getNames() {
    const response = await fetch("https://random-data-api.com/api/name/random_name");
    const response2 = await fetch("https://random-data-api.com/api/name/random_name");
    const response3 = await fetch("https://random-data-api.com/api/name/random_name");
    const data: any = await response.json();
    const data2: any = await response2.json();
    const data3: any = await response3.json();
    return Promise.all([data.name, data2.name, data3.name]).then(element => {
        console.log("Names: " + element);
    });
}

getNames();

//3.2 
async function getNames2() {
    let url: string = "https://random-data-api.com/api/name/random_name";
    let names: Array<any> = [];
    for (let i: number = 0; i < 3; i++) {
        names.push(await fetch(url).then(response => response.json()).then((data: any) => data.name));
    }
    return names.toString();
}
getNames2().then(console.log);

//3.3

function getName3() {
    let names: Array<any> = [];
    for (let i: number = 0; i < 3; i++) {
        const promise = new Promise((resolve) => {
            fetch("https://random-data-api.com/api/name/random_name").then(response => response.json()).then((data: any) => resolve(data.name));
        })
        names.push(promise.then(result => result));
    }
    return Promise.resolve(names);
}
getName3().then(result => console.log("Names3: " + result));