type Item = {
    name: string;
    price: number;
}

class Cart {
    totalPrice(items: Item[]) {
        var total = 0;
        for (const item of items) {
            var rate = 1;
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
const items = [
    { name: 'apple', price: 100 },
    { name: 'banana', price: 200 },
    { name: 'orange', price: 300 },
    { name: 'pineapple', price: 400 },
];
console.log(cart.totalPrice(items));



    
    



