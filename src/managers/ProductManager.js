import Product from "../models/product.model.js";

export default class ProductManager {

    async getProducts({ limit = 10, page = 1, sort, query }) {

        const filter = {};

        if (query) {
            if (query === "available") {
                filter.status = true;
            } else {
                filter.category = query;
            }
        }

        const options = {
            page,
            limit,
            lean: true
        };

        if (sort === "asc") {
            options.sort = { price: 1 };
        } else if (sort === "desc") {
            options.sort = { price: -1 };
        }

        return await Product.paginate(filter, options);
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async addProduct(product) {
        return await Product.create(product);
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }

    async updateProduct(id, updatedFields) {
        return await Product.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        );
    }

}