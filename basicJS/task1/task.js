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
    this.reviews = {
            ID: "",
            author: "",
            date: Date,
            comment: "",
            rating: new Map([
                ["service", 0],
                ["price", 0],
                ["value", 0],
                ["quality", 0]
            ])
    }

    // create setters and getters for all fields
    this.setID = function(ID) {
        this.ID = ID;
    }

    this.getID = function() {
        return this.ID;
    }

    this.setName = function(name) {
        this.name = name;
    }

    this.getName = function() {
        return this.name;
    }

    this.setDescription = function(description) {
        this.description = description;
    }

    this.getDescription = function() {
        return this.description;
    }

    this.setPrice = function(price) {
        this.price = price;
    }

    this.getPrice = function() {
        return this.price;
    }

    this.setBrand= function(brand) {
        this.brand = brand;
    }

    this.getBrand = function() {
        return this.brand;
    }

    this.setSizes = function(sizes) {
        this.sizes = sizes;
    }

    this.getSizes = function() {
        return this.sizes;
    }

    this.setActiveSize = function(activeSize) {
        this.activeSize = activeSize;
    }

    this.getActiveSIze = function() {
        return this.activeSize;
    }

    this.setQuantity = function(quantity) {
        this.quantity = quantity;
    }

    this.getQuantity = function() {
        return this.quantity;
    }

    this.setDate = function(date) {
        this.date = date;
    }

    this.getDate = function() {
        return this.date;
    }

    this.setReviews = function(ID, author, date, comment) {
        this.reviews.ID = ID;
        this.reviews.author = author;
        this.reviews.date = date;
        this.reviews.comment = comment;
    }

    this.getReviews = function() {
        return this.reviews;
    }

    this.setImage = function(image) {
        this.image = image;
    }

    this.getImages = function() {
        return this.images;
    }
    
    //methods for all fields
    this.getReviewByID = function(ID) {
        return this.reviews;
    }

    this.addSize = function(size) {
        this.sizes.push(size);
    }

    this.deleteSize = function(key) {
        let index = this.sizes.indexOf(key);
        this.sizes.splice(index, 1);
    }

    this.addReview = function(valueService, valuePrice, value, valueQuality) {
        this.reviews.rating.set("service", valueService);
        this.reviews.rating.set("price", valuePrice);
        this.reviews.rating.set("value", value);
        this.reviews.rating.set("quality", valueQuality);
    }

    this.deleteReview = function(key) {
        let index = this.reviews.ID.indexOf(key);
        this.reviews.splice(index, 1);
    }

    this.getAverageRating = function() {
        return (this.reviews.rating.get("service") +
         this.reviews.rating.get("price") +
          this.reviews.rating.get("value") +
           this.reviews.rating.get("quality")) / this.reviews.rating.size;
    }
};