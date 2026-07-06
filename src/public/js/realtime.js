const socket = io();

console.log("Cliente Socket.IO conectado");

const form = document.getElementById("productForm");
const productList = document.getElementById("productList");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const product = {
        title: form.title.value,
        description: form.description.value,
        code: form.code.value,
        price: Number(form.price.value),
        status: true,
        stock: Number(form.stock.value),
        category: form.category.value,
        thumbnails: []
    };

    socket.emit("addProduct", product);

    form.reset();
});

socket.on("updateProducts", (products) => {
    let html = "<ul>";

    products.forEach(product => {
        html += `
        <li>
            <strong>${product.title}</strong><br>
            Descripción: ${product.description}<br>
            Código: ${product.code}<br>
            Precio: $${product.price}<br>
            Stock: ${product.stock}<br>
            Categoría: ${product.category}<br><br>

            <button onclick="deleteProduct(${product.id})">
                Eliminar
            </button>
        </li>
        <hr>
    `;
    });

    html += "</ul>";

    productList.innerHTML = html;
});

const deleteProduct = (id) => {
    socket.emit("deleteProduct", id);
};