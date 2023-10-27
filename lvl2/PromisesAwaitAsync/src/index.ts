import fetch from 'node-fetch';

//1
// const response = await fetch("https://api.ipify.org?format=json");
// const data = await response.json();

// console.log(data as Promise<string>);

//2

async function getId() {
    const response = await fetch("https://api.ipify.org?format=json");
    return await response.json() as Promise<string>;
}

const id = await getId();
console.log(id);