import CategoriesModel from "../../models/Categories/categories.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";
import checkAssociateService from "../../services/common/checkassociate.service.js";


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

export const deleteCategory = async (req, res) => {
    const isAssociated = await checkAssociateService({ CategoryID: mongoose.Types.ObjectId(req.params.id) }, ProductModel);
    if (isAssociated) 
        return res.status(400).json({ status: "fail", message: "Category is associated with some products. Cannot delete." });
    const result = await deleteService(req, CategoriesModel); res.status(result.statusCode).json(result);
};


export default {
    createCategory,
    updateCategory,
    listCategories,
    dropdownCategories,
    deleteCategory
};
