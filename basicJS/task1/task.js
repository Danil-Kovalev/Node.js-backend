const { request } = require('http');

function Product() {
    
    this.ID = "",
    this.name = "",
    this.description = "",
    this.price = 0.0,
    this.brand = "",
    this.sizes = [],
    this.activeSize = "",
    this.quantity = 0,
    this.date = Date,
    this.images = [],
    this.reviews = []

    // create setters and getters for all fields
    this.setID = function (ID) {
        this.ID = ID;
    }

    this.getID = function () {
        return this.ID;
    }

    this.setName = function (name) {
        this.name = name;
    }

    this.getName = function () {
        return this.name;
    }

    this.setDescription = function (description) {
        this.description = description;
    }

    this.getDescription = function () {
        return this.description;
    }

    this.setPrice = function (price) {
        this.price = price;
    }

    this.getPrice = function () {
        return this.price;
    }

    this.setBrand = function (brand) {
        this.brand = brand;
    }

    this.getBrand = function () {
        return this.brand;
    }

    this.getSizes = function () {
        return this.sizes;
    }

    this.setActiveSize = function (activeSize) {
        this.activeSize = activeSize;
    }

    this.getActiveSIze = function () {
        return this.activeSize;
    }

    this.setQuantity = function (quantity) {
        this.quantity = quantity;
    }

    this.getQuantity = function () {
        return this.quantity;
    }

    this.setDate = function (date) {
        this.date = date;
    }

    this.getDate = function () {
        return this.date;
    }

    this.setImage = function (image) {
        this.images.push(image);
    }

    //methods for all fields
    this.getReviewByID = function (key) {
        for (let index = 0; index < this.reviews.length; i++) {
            if (this.reviews[index].ID == key) {
                return this.reviews[index];
            }
        }
    }

    this.getImage = function (key) {
        if (key == undefined) {
            return this.images[0];
        }
        else {
            return this.images[this.images.indexOf(key)];
        }
    }

    this.addSize = function (size) {
        this.sizes.push(size);
    }

    this.deleteSize = function (key) {
        this.sizes.splice(this.sizes.indexOf(key), 1);
    }

    this.addReview = function (review) {
        this.reviews.push(review);
    }

    this.deleteReview = function (key) {
        for (let index = 0; index < this.reviews.length; index++) {
            if (this.reviews[index].ID == key) {
                this.reviews.splice(index, 1);
                break;
            }
        }
    }

    this.getAverageRating = function () {
        let sumRating = 0;
        for (let index = 0; index < this.reviews.length; index++) {
            sumRating += this.reviews[index].rating.get("service");
            sumRating += this.reviews[index].rating.get("price");
            sumRating += this.reviews[index].rating.get("value");
            sumRating += this.reviews[index].rating.get("quality");
        }
        return sumRating / (this.reviews.length * this.reviews[0].rating.size);
    }
}

//Searches for all similar words or letters found in an array of objects
searchProducts = function (products, search) {
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

//Sorting products by price, name, ID
sortProducts = function (products, sortRule = "") {
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

let shirt = new Product();
let trainers = new Product();
let trousers = new Product();
let review = {
    ID: "213alex",
    author: "alex",
    date: 2023 - 8 - 12,
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
    date: 2022-1-13,
    comment: "beautiful",
    rating: new Map([
        ["service", 1],
        ["price", 2],
        ["value", 3],
        ["quality", 2]
    ])
}

trousers.setID("trousers1");
trousers.setName("trousers");
trousers.setDescription("Black trousers");
trousers.setPrice(19.5);
trousers.setBrand("Armani");
trousers.setSizes("XXL", "XXXL", "L");
trousers.setActiveSize("XXXL");
trousers.setQuantity(5);
trousers.addReview(review1);
trousers.addReview(review);

trainers.setID("trainers1");
trainers.setName("Trainers");
trainers.setDescription("Black trainers");
trainers.setPrice(11.5);
trainers.setBrand("Armani");
trainers.setSizes("XXL", "M", "L");
trainers.setActiveSize("L");
trainers.setQuantity(2);
trainers.addReview(review1);
trainers.addReview(review);

shirt.setID("shirt1");
shirt.setName("T-Shirt");
shirt.setDescription("White t-shirt");
shirt.setPrice(15.2);
shirt.setBrand("Gucci");
shirt.addSize("XL");
shirt.addSize("S");
shirt.setActiveSize("S");
shirt.setQuantity(6);
shirt.setImage("first.png");
shirt.setImage("second.png");
shirt.addReview(review);
shirt.addReview(review1);