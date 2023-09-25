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
Object.assign(AbstractProduct.prototype, {
    setID(ID) {
        this.ID = ID;
    },
    
    getID() {
        return this.ID;
    },
    
    setName(name) {
        this.name = name;
    },
    
    getName() {
        return this.name;
    },
    
    setDescription(description) {
        this.description = description;
    },
    
    getDescription() {
        return this.description;
    },
    
    setPrice(price) {
        this.price = price;
    },
    
    getPrice() {
        return this.price;
    },
    
    setBrand(brand) {
        this.brand = brand;
    },
    
    getBrand() {
        return this.brand;
    },
    
    setQuantity(quantity) {
        this.quantity = quantity;
    },
    
    getQuantity() {
        return this.quantity;
    },
    
    setDate(date) {
        this.date = date;
    },
    
    getDate() {
        return this.date;
    },
    
    setImage(image) {
        this.images.push(image);
    },
    
    //methods for all fields
    getReviewByID(key) {
        for (let index = 0; index < this.reviews.length; i++) {
            if (this.reviews[index].ID == key) {
                return this.reviews[index];
            }
        }
    },
    
    getImage(key) {
        if (key == undefined) {
            return this.images[0];
        }
        else {
            return this.images[this.images.indexOf(key)];
        }
    },
    
    addSize(size) {
        this.sizes.push(size);
    },
    
    deleteSize(key) {
        this.sizes.splice(this.sizes.indexOf(key), 1);
    },
    
    addReview(review) {
        this.reviews.push(review);
    },
    
    deleteReview(key) {
        for (let index = 0; index < this.reviews.length; index++) {
            if (this.reviews[index].ID == key) {
                this.reviews.splice(index, 1);
                break;
            }
        }
    },
    
    getAverageRating() {
        let sumRating = 0;
        for (let index = 0; index < this.reviews.length; index++) {
            sumRating += this.reviews[index].rating.get("service");
            sumRating += this.reviews[index].rating.get("price");
            sumRating += this.reviews[index].rating.get("value");
            sumRating += this.reviews[index].rating.get("quality");
        }
        return sumRating / (this.reviews.length * this.reviews[0].rating.size);
    },

    getFullInformation() {
        console.log("ID: " + this.getID() + "\nName: " + this.getName() + "\nDescription: " + this.getDescription() +
        "\nPrice: " + this.getPrice() + "\nQuantity: " + this.getQuantity() + "\nDate: " + this.getDate() +
        "\nBrand: " + this.getBrand() + "\nImage: " + this.getImage() + "\nReviews: " + this.reviews);
    },
    getPriceForQuantity() {

    }
})

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