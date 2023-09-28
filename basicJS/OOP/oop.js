function AbstractProduct() {
    if (this.constructor === AbstractProduct) {
        throw new Error("AbstractProduct cannot be created");
    }
    this.ID = "";
    this.name = "";
    this.description = "";
    this.price = 0.0;
    this.brand = "";
    this.quantity = 0;
    this.date = Date;
    this.images = [];
    this.reviews = []
};

AbstractProduct.prototype.setID = function(ID) {
    this.ID = ID;
};

AbstractProduct.prototype.getID = function() {
    return this.ID;
};

AbstractProduct.prototype.setName = function(name) {
    this.name = name;
};

AbstractProduct.prototype.getName = function() {
    return this.name;
};

AbstractProduct.prototype.setDescription = function(description) {
    this.description = description;
};

AbstractProduct.prototype.getDescription = function() {
    return this.description;
};

AbstractProduct.prototype.setPrice = function(price) {
    this.price = price;
};

AbstractProduct.prototype.getPrice = function() {
    return this.price;
};

AbstractProduct.prototype.setBrand = function(brand) {
    this.brand = brand;
};

AbstractProduct.prototype.getBrand = function() {
    return this.brand;
},

AbstractProduct.prototype.setQuantity = function(quantity) {
    this.quantity = quantity;
};

AbstractProduct.prototype.getQuantity = function() {
    return this.quantity;
};

AbstractProduct.prototype.setDate = function(date) {
    this.date = date;
};

AbstractProduct.prototype.getDate = function() {
    return this.date;
};

AbstractProduct.prototype.setImage = function(image) {
    this.images.push(image);
};

AbstractProduct.prototype.getImage = function(key) {
    if (key == undefined) {
        return this.images[0];
    }
    else {
        return this.images[this.images.indexOf(key)];
    }
};

AbstractProduct.prototype.setterGetterValue = function(name, value) {
    if (value == undefined) {
        switch(name) {
            case "ID": return this.getID();
            case "name": return this.getName();
            case "description": return this.getDescription();
            case "price": return this.getPrice();
            case "brand": return this.getBrand();
            case "quantity": return this.getQuantity();
            case "date": return this.getDate();
            case "images": return this.getAllImages();
            case "reviews": return this.getReviews();
            default:
                return "Sorry, but name is incorrect";
        };
    }
    else {
        switch(name) {
            case "ID":
                this.setID(value);
                break;
            case "name":
                this.setName(value);
                break;
            case "description":
                this.setDescription(value);
                break;
            case "price":
                this.setPrice(value);
                break;
            case "brand":
                this.setBrand(value);
                break;
            case "quantity":
                this.setQuantity(value);
                break;
            case "date":
                this.setDate(value);
                break;
            case "images":
                this.setImage(value);
                break;
            default:
                return "Sorry, but name is incorrect";
        };
    }
};

//methods for all fields
AbstractProduct.prototype.getReviewByID = function(key) {
    for (let index = 0; index < this.reviews.length; i++) {
        if (this.reviews[index].ID == key) {
            return this.reviews[index];
        }
    }
};

AbstractProduct.prototype.addReview = function(review) {
    this.reviews.push(review);
};

AbstractProduct.prototype.deleteReview = function(key) {
    for (let index = 0; index < this.reviews.length; index++) {
        if (this.reviews[index].ID == key) {
            this.reviews.splice(index, 1);
            break;
        }
    }
};

AbstractProduct.prototype.getReviews = function() {
    let getRating = (index) => {
        let strRating = [];
        for (let entry of this.reviews[index].rating) {
            strRating.push(` {${entry}}`);
        }
        return strRating;
    };
    let strReview = [];
    for (let i = 0; i < this.reviews.length; i++) {
        strReview.push(`\nID: ${this.reviews[i].ID}`);
        strReview.push(` Author: ${this.reviews[i].author}`);
        strReview.push(` Date: ${this.reviews[i].date}`);
        strReview.push(` Comment: ${this.reviews[i].comment}`);
        strReview.push(` Rating:${getRating(i)}`);
    }
    return strReview;
};

AbstractProduct.prototype.getAverageRating = function() {
    let sumRating = 0;
    for (let index = 0; index < this.reviews.length; index++) {
        for (let value of this.reviews[index].rating.values()) {
            sumRating += value;
        };
    }
    return sumRating / (this.reviews.length * this.reviews[0].rating.size);
};

AbstractProduct.prototype.getAllImages = function() {
        return this.images;
};

AbstractProduct.prototype.getFullInformation = function() {
    let fullInfo = [];
    fullInfo.push(`ID: ${this.getID()}`);
    fullInfo.push(`\nName: ${this.getName()}`);
    fullInfo.push(`\nDescription: ${this.getDescription()}`);
    fullInfo.push(`\nPrice: ${this.getPrice()}`);
    fullInfo.push(`\nQuantity: ${this.getQuantity()}`);
    fullInfo.push(`\nDate: ${this.getDate()}`);
    fullInfo.push(`\nBrand: ${this.getBrand()}`);
    fullInfo.push(`\nImages: ${this.getAllImages()}`);
    fullInfo.push(`\nReviews:\n----${this.getReviews()}\n----`);
    return fullInfo;
};

AbstractProduct.prototype.getPriceForQuantity = function(num) {
    return `Price for ${num} quantity: ${this.getPrice() * num}`;
};

function Clothes() {
    AbstractProduct.call(this);
    this.material = "";
    this.color = "";
};
Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

Clothes.prototype.setMaterial = function(material) {
    this.material = material;
};

Clothes.prototype.getMaterial = function() {
    return this.material;
};

Clothes.prototype.setColor = function(color) {
    this.color = color;
};

Clothes.prototype.getColor = function() {
    return this.color;
};

Clothes.prototype.getInformation = function() {
    return `${this.getFullInformation()}\nMaterial: ${this.getMaterial()}\nColor: ${this.getColor()}`;
};

function Electronics() {
    AbstractProduct.call(this);
    this.warranty = 0;
    this.power = 0;
}
Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.setWarranty = function(warranty) {
    this.warranty = warranty;
};

Electronics.prototype.getWarranty = function() {
    return this.warranty;
};

Electronics.prototype.setPower = function(power) {
    this.power = power;
};

Electronics.prototype.getPower = function() {
    return this.power;
};

Electronics.prototype.getInformation = function() {
    return `${this.getFullInformation()}\nWarranty: ${this.getWarranty()}\nPower: ${this.getPower()}`;
};
    
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
};

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
};