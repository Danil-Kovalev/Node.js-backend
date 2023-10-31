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

function getNames3() {
    const numberRequest: number = 3;
    let arrayNames: Array<any> = [];
    let arrayStringNames: Array<string> = [];
    let url = "https://random-data-api.com/api/name/random_name";
    for (let i: number = 0; i < numberRequest; i++) {
        arrayNames.push(fetch(url).then(response => response.json()).then((data: any) => data.name));
    }
    let promise = new Promise((resolve, reject) => {
        arrayNames.map((element: Promise<string>) => {
            element.then((value: string) => {
                arrayStringNames.push(value)
                if (arrayStringNames.length == numberRequest) {
                    resolve(arrayStringNames);
                }
            }).catch(err => reject(err));
        })
    })
    promise.then(value => console.log("Names3: " + value))
}

getNames3();

//4.1

let index:number = 1;

function getGender() {
    let url = "https://random-data-api.com/api/users/random_user";
    return new Promise((resolve) => {
        resolve(fetch(url).then(response => response.json()).then((data: any) => data.gender));
    })
}

function getFemale(promiseGender: Promise<any>) {
    const promise = new Promise(() => {
        promiseGender.then(value => {
            if (value === "Female") {
                console.log(`Get female in ${index} times without async/await!`);
            }
            else {
                index++;
                getFemale(getGender());
            }
        })
    })
}

getFemale(getGender());

//4.2

async function getFemale2() {
    const response = await fetch("https://random-data-api.com/api/users/random_user");
    const data: any = await response.json();
    return data.gender;
}

for (let index: number = 1; index > 0; index++) {
    if (await getFemale2() === "Female") {
        console.log(`Get female in ${index} times with async/await!`);
        break;
    }
}