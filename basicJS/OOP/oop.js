class AbstractProduct {
    constructor() {
        if (this.constructor == AbstractProduct) {
            throw new Error("AbstractProduct cannot be created");
        }
    }

    ID = "";
    name = "";
    description = "";
    price = 0.0;
    brand = "";
    sizes = [];
    activeSize = "";
    quantity = 0;
    date = Date;
    images = [];
    reviews = []

    setID(ID) {
        this.ID = ID;
    }

    getID() {
        return this.ID;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setDescription(description) {
        this.description = description;
    }

    getDescription() {
        return this.description;
    }

    setPrice(price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    getQuantity() {
        return this.quantity;
    }

    getReviewByID(key) {
        for (let index = 0; index < this.reviews.length; i++) {
            if (this.reviews[index].ID == key) {
                return this.reviews[index];
            }
        }
    }

    addReview(review) {
        this.reviews.push(review);
    }

    deleteReview(key) {
        for (let index = 0; index < this.reviews.length; index++) {
            if (this.reviews[index].ID == key) {
                this.reviews.splice(index, 1);
                break;
            }
        }
    }

    setImage(image) {
        this.images.push(image);
    }

    getImage(key) {
        if (key == undefined) {
            return this.images[0];
        }
        else {
            return this.images[this.images.indexOf(key)];
        }
    }

    setDate (date) {
        this.date = date;
    }

    getDate(){
        return this.date;
    }

    setBrand(brand) {
        this.brand = brand;
    }

    getBrand() {
        return this.brand;
    }

    searchProducts(products, search) {
        let result = [];
        for (let index = 0; index < products.length; index++) {
            if (products[index].getName().toLowerCase().includes(search.toLowerCase())) {
                result.push(products[index]);
            }
            else if (products[index].getDescription().toLowerCase().includes(search.toLowerCase())) {
                result.push(products[index]);
            }
        }
        return result;
    }

    sortProducts(products, sortRule = "") {
        if (sortRule == "price") {
            return products.sort((firstElement, secondElement) => firstElement.price > secondElement.price ? 1 : -1)
        }
        else if (sortRule == "name") {
            return products.sort((firstElement, secondElement) => firstElement.name > secondElement.name ? 1 : -1)
        }
        else {
            return products.sort((firstElement, secondElement) => firstElement.ID > secondElement.ID ? 1 : -1)
        }
    }

    getFullInformation() {
        console.log("ID: " + this.getID() + "\nName: " + this.getName() + "\nDescription: " + this.getDescription() +
        "\nPrice: " + this.getPrice() + "\nQuantity: " + this.getQuantity() + "\nDate: " + this.getDate() +
        "\nBrand: " + this.getBrand() + "\nImage: " + this.getImage() + "\nReviews: " + this.reviews);
    }

    getPriceForQuantity() {
        
    }
};

class Clothes extends AbstractProduct {

    #material = "";
    #color = "";

    setMaterial(material) {
        this.material = material;
    }

    getMaterial() {
        return this.material;
    }

    setColor(color) {
        this.color = color;
    }

    getColor() {
        return this.color;
    }

    getInformation() {
        console.log("Material: " + this.getWarranty() + "\nColor: " + this.getPower());
    }

    getFullInformation() {
        super.getFullInformation();
        this.getInformation();
    }
};

class Electronics extends AbstractProduct {
    
    #warranty = 0;
    #power = 0;

    setWarranty(warranty) {
        this.warranty = warranty;
    }

    getWarranty() {
        return this.warranty;
    }

    setPower(power) {
        this.power = power;
    }

    getPower() {
        return this.power;
    }

    getInformation() {
        console.log("Warranty: " + this.getWarranty() + "\nPower: " + this.getPower());
    }

    getFullInformation() {
        super.getFullInformation();
        this.getInformation();
    }
};

let review = {
    ID: "213alex",
    author: "alex",
    date: 2023,
    comment: "cool",
    rating: new Map([
        ["service", 5],
        ["price", 1],
        ["value", 3],
        ["quality", 2]
    ])
}

let review1 = {
    ID: "123sam",
    author: "sam",
    date: 2022,
    comment: "beautiful",
    rating: new Map([
        ["service", 1],
        ["price", 2],
        ["value", 3],
        ["quality", 2]
    ])
}