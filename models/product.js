class Product {
    constructor(id, categoryId, name, ingredients, price, orderStart, orderStop){
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.ingredients = ingredients;
        this.price = price;
        this.orderStart = orderStart;
        this.orderStop = orderStop;
    }
}

export default Product;