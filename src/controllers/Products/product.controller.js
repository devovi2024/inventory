import ProductModel from "../../models/Products/product.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listTowJoinService from "../../services/common/listTowJoin.service.js";

export async function createProduct(req, res) {
    let result = await createService(req, ProductModel);
    return res.status(result.statusCode).json(result);
}

export async function updateProduct(req, res) {
    let result = await updateService(req, ProductModel);
    return res.status(result.statusCode).json(result);
}

export async function productList(req, res) {
    try {
        // Regex search
        let SearchRgx = { "$regex": req.params.searchKeyword || "", "$options": "i" };

        // Joins
        let JoinStage1 = {
            $lookup: { from: "brands", localField: "BrandID", foreignField: "_id", as: "brands" }
        };
        let JoinStage2 = {
            $lookup: { from: "categories", localField: "CategoryID", foreignField: "_id", as: "categories" }
        };

        // Search array
        let SearchArray = [
            { Name: SearchRgx },
            { Unit: SearchRgx },
            { Details: SearchRgx },
            { 'brands.Name': SearchRgx },
            { 'categories.Name': SearchRgx }
        ];

        // Call listTowJoinService
        let Result = await listTowJoinService(req, ProductModel, SearchArray, [JoinStage1], [JoinStage2]);

        return res.status(200).json(Result);

    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message });
    }
}

export default {
    createProduct,
    updateProduct,
    productList
};
