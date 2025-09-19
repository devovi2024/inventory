import ProductModel from "../../models/Products/product.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";

export async function createProduct(req, res) {
    let result = await createService(req, ProductModel);
    return res.status(result.statusCode).json(result);
}

export async function updateProduct(req, res) {
    let result = await updateService(req, ProductModel);
    return res.status(result.statusCode).json(result);
}

export default {
    createProduct,
    updateProduct
};
