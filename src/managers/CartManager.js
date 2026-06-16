import fs from "fs/promises";

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        const data = await fs.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async createCart() {
        const carts = await this.getCarts();

        const newId =
            carts.length > 0
                ? carts[carts.length - 1].id + 1
                : 1;

        const newCart = {
            id: newId,
            products: []
        };

        carts.push(newCart);

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        );

        return newCart;
    }

    async getCartById(id) {
        const carts = await this.getCarts();

        return carts.find((cart) => cart.id === id);
    }

    async addProductToCart(cid, pid) {
        const carts = await this.getCarts();

        const cart = carts.find(
            (cart) => cart.id === cid
        );

        if (!cart) {
            return null;
        }

        const productInCart = cart.products.find(
            (product) => product.product === pid
        );

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        );

        return cart;
    }
}