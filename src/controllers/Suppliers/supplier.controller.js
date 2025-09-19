
import SuppliersModel from "../../models/Suppliers/suppliers.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";

export async function createSupplier(req, res) {
    let result = await createService(req, SuppliersModel);
    return res.status(result.statusCode).json(result);
}

export async function updateSupplier(req, res) {
    let result = await updateService(req, SuppliersModel);
    return res.status(result.statusCode).json(result);
}

export async function listSuppliers(req, res) {
    const SearchArray = ["SupplierName", "Phone", "Email"];
    let result = await listService(req, SuppliersModel, SearchArray);
    return res.status(result.statusCode).json(result);
}

export async function dropdownSuppliers(req, res) {
    const Projection = { _id: 1, SupplierName: 1 };
    let result = await dropdownService(req, SuppliersModel, Projection);
    return res.status(result.statusCode).json(result);
}

export default {
    createSupplier,
    updateSupplier,
    listSuppliers,
    dropdownSuppliers
};
