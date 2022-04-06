class Product {
    constructor(id, categoryId, name, ingredients, price, orderStart, orderStop, picturFullLink, hasOption){
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.ingredients = ingredients;
        this.price = price;
        this.orderStart = orderStart;
        this.orderStop = orderStop;
        this.picturFullLink = picturFullLink;
        this.hasOption = hasOption;
    }
}

export default Product;