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
    let strReview = [];
    for (let i = 0; i < this.reviews.length; i++) {
        strReview.push(`\nID: ${this.reviews[i].ID}`);
        strReview.push(` Author: ${this.reviews[i].author}`);
        strReview.push(` Date: ${this.reviews[i].date}`);
        strReview.push(` Comment: ${this.reviews[i].comment}`);
        strReview.push(` Rating: ${this.reviews[i].rating}`);
    }
    return strReview;
};

AbstractProduct.prototype.getAverageRating = function() {
    let sumRating = 0;
    for (let index = 0; index < this.reviews.length; index++) {
        sumRating += this.reviews[index].rating.get("service");
        sumRating += this.reviews[index].rating.get("price");
        sumRating += this.reviews[index].rating.get("value");
        sumRating += this.reviews[index].rating.get("quality");
    }
    return sumRating / (this.reviews.length * this.reviews[0].rating.size);
};

AbstractProduct.prototype.getAllImages = function() {
        return this.images;
};

AbstractProduct.prototype.getFullInformation = function() {
        console.log("ID: " + this.getID() + "\nName: " + this.getName() + "\nDescription: " + this.getDescription() +
        "\nPrice: " + this.getPrice() + "\nQuantity: " + this.getQuantity() + "\nDate: " + this.getDate() +
        "\nBrand: " + this.getBrand() + "\nImage: " + this.getAllImages() + `\nReviews{${this.getReviews()}\n}`);
};

AbstractProduct.prototype.getPriceForQuantity = function() {

};

function Clothes() {
    AbstractProduct.call(this);
    this.material = "";
    this.color = "";
};
Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;

Object.assign(Clothes.prototype, {
    setMaterial(material) {
        this.material = material;
    },

    getMaterial() {
        return this.material;
    },

    setColor(color) {
        this.color = color;
    },

    getColor() {
        return this.color;
    },

    getInformation() {
        this.getFullInformation();
        console.log("Material: " + this.getMaterial() + "\nColor: " + this.getColor());
    }
})

function Electronics() {
    AbstractProduct.call(this);
    this.warranty = 0;
    this.power = 0;
}
Electronics.prototype = Object.create(AbstractProduct.prototype);
Electronics.prototype.constructor = Electronics;

Object.assign(Electronics.prototype, {
    setWarranty(warranty) {
        this.warranty = warranty;
    },

    getWarranty() {
        return this.warranty;
    },

    setPower(power) {
        this.power = power;
    },

    getPower() {
        return this.power;
    },

    getInformation() {
        this.getFullInformation();
        console.log("Warranty: " + this.getWarranty() + "\nPower: " + this.getPower());
    }
})
    
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