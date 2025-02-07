class item2 {
    name: string;
    price: number;
    rate: number;

    constructor(name: string, price: number, rate: number) {
        this.name = name;
        this.price = price;
        this.rate = rate;
    }
}

class Cart2 {
    totalPrice(items: item2[]) {
        var total = 0;
        for (const item of items) {
            total += item.price * item.rate;
        }
        return total;
    }
}

// main
const cart2 = new Cart2();
const items2 = [
    new item2('apple', 100, 0.9),
    new item2('banana', 200, 0.8),
    new item2('orange', 300, 1.2),
    new item2('pineapple', 400, 1),

];
console.log(cart2.totalPrice(items2));
