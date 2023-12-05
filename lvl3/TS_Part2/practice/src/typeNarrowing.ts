/**
 * Interface to object, which will be passed to the function
 */
interface BigObject {
    [a: string]: {
        cvalue: number | string | BigObject | undefined
    } | undefined
}

/**
 * Function that returns the sum of the object's values ​​or a number if the object has incorrect data
 * @param a object being processed
 * @returns sum of object values
 */
function summ(a: BigObject) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (elem) {
            if (typeof elem.cvalue === "number") {
                return elem.cvalue;   
            }
            else if (typeof elem.cvalue === "string") {
                return +elem.cvalue || 2022;
            }
            else if (elem.cvalue !== undefined) {
                return summ(elem.cvalue);   
            }
            else {
                return 2022;
            }
        }
        else return 2022;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i]!;
    }
    return sum;
}

let a: BigObject = {
    hello: {
        cvalue: 1
    },
    world: {
        cvalue: {
            yay: {
                cvalue: "2"
            }
        }
    }
} 

console.log(summ(a));