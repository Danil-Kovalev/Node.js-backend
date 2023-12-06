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
        let value = elem ? (typeof elem.cvalue === "number" ? elem.cvalue :
            typeof elem.cvalue === "string" ? +elem.cvalue || 2022 :
            elem.cvalue !== undefined ? summ(elem.cvalue) : 2022) : 2022
        return value;
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