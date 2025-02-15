type IGoodItem = {
    name: string;
    price: number;
    rate: number;
    // priceに係数を掛ける処理はここで管理するように変更
    calcPrice: () => number;
}

class GoodItem implements IGoodItem {
    name: string;
    price: number;
    rate: number; 

    constructor(name: string, price: number, rate: number) {
        this.name = name;
        this.price = price;
        this.rate = rate;
    }

    calcPrice() {
        return this.price * this.rate;
    }
}

class Cart2 {
    items: IGoodItem[];

    constructor() {
        this.items = [];
    }

    addItem(item: IGoodItem) {
        this.items.push(item);
    }

    // Good: OCP原則を満たすようになった
    totalPrice() {
        return this.items.reduce((sum, item) => sum + item.calcPrice(), 0);
    }
}

// main
const cart2 = new Cart2();
cart2.addItem(new GoodItem('apple', 100, 0.9));
cart2.addItem(new GoodItem('banana', 200, 0.8));
cart2.addItem(new GoodItem('orange', 300, 1.2));
cart2.addItem(new GoodItem('pineapple', 400, 1));
console.log(cart2.totalPrice());
