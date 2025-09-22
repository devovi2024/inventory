import mongoose from "mongoose";
import CategoriesModel from "../../models/Categories/categories.model.js";
import ProductModel from "../../models/Products/product.model.js"; // ProductModel import
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";
import checkAssociateService from "../../services/common/checkassociate.service.js";
import deleteService from "../../services/common/delete.service.js";
import detailByIDService from "../../services/common/detailbyid.service.js";

export async function createCategory(req, res) {
    const result = await createService(req, CategoriesModel);
    return res.status(result.statusCode).json(result);
}

export async function updateCategory(req, res) {
    const result = await updateService(req, CategoriesModel);
    return res.status(result.statusCode).json(result);
}

export async function listCategories(req, res) {
    const SearchArray = ["Name"];
    const result = await listService(req, CategoriesModel, SearchArray);
    return res.status(result.statusCode).json(result);
}

export async function dropdownCategories(req, res) {
    const Projection = { _id: 1, Name: 1 };
    const result = await dropdownService(req, CategoriesModel, Projection);
    return res.status(result.statusCode).json(result);
}

export async function categoryDetails(req, res) {
    try {
        const result = await detailByIDService(req, CategoriesModel);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const isAssociated = await checkAssociateService(
            { CategoryID: mongoose.Types.ObjectId(req.params.id) },
            ProductModel
        );

        if (isAssociated) 
            return res.status(400).json({ status: "fail", message: "Category is associated with some products. Cannot delete." });

        const result = await deleteService(req, CategoriesModel);
        res.status(result.statusCode).json(result);

    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

export default {
    createCategory,
    updateCategory,
    listCategories,
    dropdownCategories,
    categoryDetails,
    deleteCategory
};
