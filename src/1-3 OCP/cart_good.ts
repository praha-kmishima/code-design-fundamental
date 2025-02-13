class item2 {
    name: string;
    price: number;
    rate: number; 

    constructor(name: string, price: number, rate: number) {
        this.name = name;
        this.price = price;
        this.rate = rate;
    }

    // priceに係数を掛ける処理はここで管理するように変更
    calcPrice() {
        return this.price * this.rate;
    }
}

class Cart2 {
    items: item2[];

    constructor() {
        this.items = [];
    }

    addItem(item: item2) {
        this.items.push(item);
    }

    // Good: 係数を管理する必要がなくなり、修正に対して閉じられるようなった
    totalPrice() {
        return this.items.reduce((sum, item) => sum + item.calcPrice(), 0);
    }
}

// main
const cart2 = new Cart2();
cart2.addItem(new item2('apple', 100, 0.9));
cart2.addItem(new item2('banana', 200, 0.8));
cart2.addItem(new item2('orange', 300, 1.2));
cart2.addItem(new item2('pineapple', 400, 1));
console.log(cart2.totalPrice());
