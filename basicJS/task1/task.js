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

    this.setSizes = function (sizes) {
        this.sizes = sizes;
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

    this.getImage = function (key) {  //not working
        if (key != undefined) {
            const imageOut = document.querySelector('.image-out');
            let img = document.createElement('img');
            img.src = "basicJS/task1/" + key + ".png";
            imageOut.append(img);
            return imageOut;
        }
        else {
            return this.images;
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