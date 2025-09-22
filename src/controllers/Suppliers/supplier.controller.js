import mongoose from "mongoose";
import SuppliersModel from "../../models/Suppliers/suppliers.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";
import checkAssociateService from "../../services/common/checkassociate.service.js";
import deleteService from "../../services/common/delete.service.js";
import PurchaseModel from "../../models/Purchase/purchase.model.js"; 
import detailByIDService from "../../services/common/detailbyid.service.js"
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

export async function deleteSupplier(req, res) {
    try {
        const SupplierID = mongoose.Types.ObjectId(req.params.id);

        const isAssociated = await checkAssociateService(
            { SupplierID },
            PurchaseModel
        );

        if (isAssociated)
            return res.status(400).json({ status: "fail", message: "Supplier is associated with some purchases. Cannot delete." });

        const result = await deleteService(req, SuppliersModel);
        return res.status(result.statusCode).json(result);

    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
}

export async function supplierDetails(req, res) {
    try {
        const result = await detailByIDService(req, SuppliersModel);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
    }
}


export default {
    createSupplier,
    updateSupplier,
    listSuppliers,
    dropdownSuppliers,
    deleteSupplier,
    supplierDetails
};
