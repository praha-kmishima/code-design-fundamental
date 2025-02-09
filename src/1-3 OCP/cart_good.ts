class item2 {
    name: string;
    price: number;
    rate: number; // priceに掛ける係数

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
            // 変更点: 係数はitemが保持している
            // ⇒ 条件が変わるたびに係数を変更する修正が不要になる
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
