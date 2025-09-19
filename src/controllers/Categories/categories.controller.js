import CategoriesModel from "../../models/Categories/categories.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";

export async function createCategory(req, res) {
    let result = await createService(req, CategoriesModel);
    return res.status(result.statusCode).json(result);
}

export async function updateCategory(req, res) {
    let result = await updateService(req, CategoriesModel);
    return res.status(result.statusCode).json(result);
}

export async function listCategories(req, res) {
    const SearchArray = ["Name"];
    let result = await listService(req, CategoriesModel, SearchArray);
    return res.status(result.statusCode).json(result);
}

export async function dropdownCategories(req, res) {
    const Projection = { _id: 1, Name: 1 };
    let result = await dropdownService(req, CategoriesModel, Projection);
    return res.status(result.statusCode).json(result);
}

export default {
    createCategory,
    updateCategory,
    listCategories,
    dropdownCategories
};
