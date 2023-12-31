// 1. 

function getFirstWord(a: string): number {
	return a.split(/ +/)[0].length;
}

// 2. 

function getUserNamings(a: {name: string, surname: string}): object {
  return { 
		fullname: a.name + " " + a.surname, 
		initials: a.name[0] + "." + a.surname[0] 
	};
}

// 3. 

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: {products?: any}) {
  return a?.products?.map((prod?: any): any => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
function Hey(a: {name: any, cuteness?: number, coolness?: number}) {
    return "hey! i'm " + a.name();
}
Hey({name: () => "roma", cuteness: 100});
Hey({name: () => "vasya", coolness: 100})

// 4.2

interface Pet {
    name(): string;
}

class Cat implements Pet {
    petName: string;
    value: any;

    constructor(name: string, value: any) {
        this.petName = name;
        this.value = value;
    }

    name(): string {
        return this.petName;
    };
}

class Dog extends Cat {

}

function Hey2(abstractPet: Pet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
Hey2(a);
Hey2(b)

// 4.3

function hey(a: any) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey({name: () => "roma", type: "cat", cuteness: 100})
hey({name: () => "vasya", type: "dog", coolness: 100})

// 5.

// google for Record type
function stringEntries(a: Record<string, object>) {
   return Array.isArray(a) ? a : Object.keys(a)
}

// 6.

// you don't know Promises and async/await yet. Or do you? 
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: any) {
    return "*".repeat(a)
}
const hello = async () => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))