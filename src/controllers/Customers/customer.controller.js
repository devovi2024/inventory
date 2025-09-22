import mongoose from "mongoose";
import CustomersModel from "../../models/Customers/customers.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";
import checkAssociateService from "../../services/common/checkassociate.service.js";
import deleteService from "../../services/common/delete.service.js";
import SalesModel from "../../models/Sales/sales.model.js"; 

export async function createCustomer(req, res) {
    const result = await createService(req, CustomersModel);
    return res.status(result.statusCode).json(result);
}

export async function updateCustomer(req, res) {
    const result = await updateService(req, CustomersModel);
    return res.status(result.statusCode).json(result);
}

export async function listCustomers(req, res) {
    const SearchArray = ["CustomerName", "Phone", "Email"];
    const result = await listService(req, CustomersModel, SearchArray);
    return res.status(result.statusCode).json(result);
}

export async function dropdownCustomers(req, res) {
    const Projection = { _id: 1, CustomerName: 1 };
    const result = await dropdownService(req, CustomersModel, Projection);
    return res.status(result.statusCode).json(result);
}

export async function deleteCustomer(req, res) {
    const isAssociated = await checkAssociateService(
        { CustomerID: mongoose.Types.ObjectId(req.params.id) },
        SalesModel
    );
    if (isAssociated) return res.status(400).json({ status: "fail", message: "Customer is associated with some sales. Cannot delete." });
    const result = await deleteService(req, CustomersModel); 
    res.status(result.statusCode).json(result);
}

export default {
    createCustomer,
    updateCustomer,
    listCustomers,
    dropdownCustomers,
    deleteCustomer
};
