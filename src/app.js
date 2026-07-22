import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import ProductManager from "./managers/ProductManager.js";
import { connectDB } from "./config/database.js";


import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const productManager = new ProductManager();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


await connectDB();


const server = app.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080");
});

const io = new Server(server);

io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    const products = await productManager.getProducts();
    socket.emit("updateProducts", products);

    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product);

        const products = await productManager.getProducts();

        io.emit("updateProducts", products);
    });

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);

        const products = await productManager.getProducts();

        io.emit("updateProducts", products);
    });
});