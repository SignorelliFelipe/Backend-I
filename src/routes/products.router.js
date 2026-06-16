import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const productManager = new ProductManager(
    "./src/data/products.json"
);

router.get("/", async (req, res) => {
    const products = await productManager.getProducts();

    res.json(products);
});
router.get("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);

    const product = await productManager.getProductById(pid);

    res.json(product);
});

router.post("/", async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);

        res.status(201).json(product);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: error.message
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);

    await productManager.deleteProduct(pid);

    res.json({
        mensaje: "Producto eliminado"
    });
});

router.put("/:pid", async (req, res) => {
    const pid = Number(req.params.pid);

    const updatedProduct =
        await productManager.updateProduct(
            pid,
            req.body
        );

    res.json(updatedProduct);
});

export default router;