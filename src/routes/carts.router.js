import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();

const cartManager = new CartManager(
    "./src/data/carts.json"
);

router.post("/", async (req, res) => {
    const cart = await cartManager.createCart();

    res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
    const cid = Number(req.params.cid);

    const cart = await cartManager.getCartById(cid);

    res.json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = Number(req.params.cid);
    const pid = Number(req.params.pid);

    const cart = await cartManager.addProductToCart(
        cid,
        pid
    );

    res.json(cart);
});

export default router;