import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();

const productManager = new ProductManager();

router.get("/", async (req, res) => {

    const {
        limit = 10,
        page = 1,
        sort,
        query
    } = req.query;

    const result = await productManager.getProducts({
        limit,
        page,
        sort,
        query
    });

    res.json({
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage
            ? `/api/products?page=${result.prevPage}`
            : null,
        nextLink: result.hasNextPage
            ? `/api/products?page=${result.nextPage}`
            : null
    });

});

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;

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
    const pid = req.params.pid;

    await productManager.deleteProduct(pid);

    res.json({
        mensaje: "Producto eliminado"
    });
});

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid;

    const updatedProduct =
        await productManager.updateProduct(
            pid,
            req.body
        );

    res.json(updatedProduct);
});

export default router;