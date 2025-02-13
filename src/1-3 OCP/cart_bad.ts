type Item = {
    name: string;
    price: number;
}

class Cart {
    items: Item[];

    constructor() {
        this.items = [];
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    totalPrice() {
        var total = 0;
        for (const item of this.items) {
            var rate = 1;
            // BAD: 商品に対する係数を変更するたびにコード修正が必要・・・
            switch (item.name) {
                case 'apple':
                    rate = 0.9;
                    total += item.price * rate;
                    break;
                case 'banana':
                    rate = 0.8;
                    total += item.price * rate;
                    break;
                case 'orange':
                    rate = 1.2;
                    total += item.price * rate;
                    break;
                default:
                    total += item.price;
            }
        }
        return total;
    }
}

// main
const cart = new Cart();
cart.addItem({ name: 'apple', price: 100 });
cart.addItem({ name: 'banana', price: 200 });
cart.addItem({ name: 'orange', price: 300 });
cart.addItem({ name: 'pineapple', price: 400 });
console.log(cart.totalPrice());



    
    



