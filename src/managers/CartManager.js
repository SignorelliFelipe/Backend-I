import Cart from "../models/cart.model.js";

export default class CartManager {

    async getCarts() {
        return await Cart.find();
    }

    async createCart() {
        return await Cart.create({
            products: []
        });
    }

    async getCartById(id) {
        return await Cart.findById(id)
            .populate("products.product")
            .lean();
    }
    async addProductToCart(cid, pid) {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return null;
        }

        const productInCart = cart.products.find(
            (p) => p.product.toString() === pid
        );

        if (productInCart) {
            productInCart.quantity++;
        } else {
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        await cart.save();

        return cart;
    }

    async removeProductFromCart(cid, pid) {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return null;
        }

        cart.products = cart.products.filter(
            (p) => p.product.toString() !== pid
        );

        await cart.save();

        return cart;
    }

    async updateProductQuantity(cid, pid, quantity) {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return null;
        }

        const product = cart.products.find(
            (p) => p.product.toString() === pid
        );

        if (!product) {
            return null;
        }

        product.quantity = quantity;

        await cart.save();

        return cart;
    }

    async clearCart(cid) {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return null;
        }

        cart.products = [];

        await cart.save();

        return cart;
    }

    async replaceCart(cid, products) {

        const cart = await Cart.findById(cid);

        if (!cart) {
            return null;
        }

        cart.products = products;

        await cart.save();

        return cart;
    }
}