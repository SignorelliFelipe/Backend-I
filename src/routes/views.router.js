import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";
import CartManager from "../managers/CartManager.js";

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/", async (req, res) => {

    const result = await productManager.getProducts({});

    res.render("home", {
        products: result.docs
    });

});

router.get("/realtimeproducts", async (req, res) => {

    const result = await productManager.getProducts({});

    res.render("realTimeProducts", {
        products: result.docs
    });

});

router.get("/products", async (req, res) => {

    const { limit = 10, page = 1, sort, query } = req.query;

    const result = await productManager.getProducts({
        limit,
        page,
        sort,
        query
    });

    res.render("products", {
        products: result.docs,
        page: result.page,
        totalPages: result.totalPages,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
    });

});

router.get("/carts/:cid", async (req, res) => {

    const cart = await cartManager.getCartById(req.params.cid);

    const total = cart.products.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity);
    }, 0);

    res.render("cart", {
        cart,
        total
    });

});

export default router;