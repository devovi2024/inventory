import mongoose from "mongoose";
import ProductModel from "../../models/Products/product.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listTowJoinService from "../../services/common/listTowJoin.service.js";
import checkAssociateService from "../../services/common/checkassociate.service.js";
import ReturnProductModel from "../../models/Return/returnproduct.model.js";
import PurchaseModel from "../../models/Purchase/purchase.model.js";
import SalesModel from "../../models/Sales/sales.model.js";
import deleteService from "../../services/common/delete.service.js";

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
        let SearchRgx = { "$regex": req.params.searchKeyword || "", "$options": "i" };

        let JoinStage1 = {
            $lookup: { from: "brands", localField: "BrandID", foreignField: "_id", as: "brands" }
        };
        let JoinStage2 = {
            $lookup: { from: "categories", localField: "CategoryID", foreignField: "_id", as: "categories" }
        };

        let SearchArray = [
            { Name: SearchRgx },
            { Unit: SearchRgx },
            { Details: SearchRgx },
            { 'brands.Name': SearchRgx },
            { 'categories.Name': SearchRgx }
        ];

        let Result = await listTowJoinService(req, ProductModel, SearchArray, [JoinStage1], [JoinStage2]);

        return res.status(200).json(Result);

    } catch (error) {
        return res.status(400).json({ status: "fail", message: error.message });
    }
}

export async function deleteProduct(req, res) {
    const DeleteID = mongoose.Types.ObjectId(req.params.id);

    let CheckReturnAssociate = await checkAssociateService({ ProductID: DeleteID }, ReturnProductModel);
    let CheckPurchaseAssociate = await checkAssociateService({ ProductID: DeleteID }, PurchaseModel);
    let CheckSalesAssociate = await checkAssociateService({ ProductID: DeleteID }, SalesModel);

    if (CheckReturnAssociate)
        return res.status(400).json({ status: "fail", message: "Product is associated with some returns. Cannot delete." });
    else if (CheckPurchaseAssociate)
        return res.status(400).json({ status: "fail", message: "Product is associated with some purchases. Cannot delete." });
    else if (CheckSalesAssociate)
        return res.status(400).json({ status: "fail", message: "Product is associated with some sales. Cannot delete." });
    else {
        let result = await deleteService(req, ProductModel);
        return res.status(result.statusCode).json(result);
    }
}

export default {
    createProduct,
    updateProduct,
    productList,
    deleteProduct
};
