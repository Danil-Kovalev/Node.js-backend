function mapObject<Input, Output>(obj: Record<string, Input>, func: (element: Input) => Output): Record<string, Output> {
    let newObj: Record<string, Output> = {};
    Object.entries(obj).forEach(([key, value]: [string, Input]) => {
        newObj[key] = func(value);
    })
    return newObj;
}

let obj = mapObject({"roma": 5, "vasya": 2}, (x: number) => x > 2);
console.log(obj)