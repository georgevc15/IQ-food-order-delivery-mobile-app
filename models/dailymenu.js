class DailyMenu {
    constructor(id, name, price, orderStart, orderStop, availableDays) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.orderStart = orderStart;
        this.orderStop = orderStop;
        this.availableDays = availableDays;
    }
}

export default DailyMenu;