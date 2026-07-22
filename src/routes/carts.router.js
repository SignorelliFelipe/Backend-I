import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();

const cartManager = new CartManager();

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();

    res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;

    const cart = await cartManager.getCartById(cid);

    res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = await cartManager.addProductToCart(
        cid,
        pid
    );

    res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    const cart = await cartManager.removeProductFromCart(
        cid,
        pid
    );

    res.json(cart);

});

router.put("/:cid/products/:pid", async (req, res) => {

    const { cid, pid } = req.params;

    const { quantity } = req.body;

    const cart =
        await cartManager.updateProductQuantity(
            cid,
            pid,
            quantity
        );

    res.json(cart);

});

router.delete("/:cid", async (req, res) => {

    const { cid } = req.params;

    const cart = await cartManager.clearCart(cid);

    res.json(cart);

});

router.put("/:cid", async (req, res) => {

    const { cid } = req.params;

    const products = req.body;

    const cart = await cartManager.replaceCart(
        cid,
        products
    );

    res.json(cart);

});

export default router;