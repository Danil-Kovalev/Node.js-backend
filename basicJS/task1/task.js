function Product() {
    
    this.ID = "";
    this.name = "";
    this.description = "";
    this.price = 0.0;
    this.brand = "";
    this.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    this.activeSize = "";
    this.quantity = 0;
    this.date = Date;
    this.images = [""];
    this.reviews = {
            ID: "",
            author: "",
            date: Date,
            comment: "",
        }
}