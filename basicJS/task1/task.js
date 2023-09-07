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
    this.reviews = [
        {
            ID: this.ID,
            author: this.name,
            date: this.date,
            comment: this.description,
            rating: {
                service: 0,
                price: 0,
                value: 0,
                quality: 0
            }
        }
    ]

    this.getReviewByID = function(key) {
        return this.reviews;
    }

    this.addSize = function(size) {
        this.sizes.push(size);
    }

    this.deleteSize = function(key) {
        let index = this.sizes.indexOf(key);
        this.sizes.splice(index, 1);
    }

    this.addReview = function(key) {
        this.reviews.fill(key);
    }

    this.deleteReview = function(key) {
        let index = this.reviews.ID.indexOf(key);
        this.reviews.splice(index, 1);
    }

    this.getAverageRating = function() {
        return (rating.service + rating.price + rating.value + rating.quality) / 4;
    }
};