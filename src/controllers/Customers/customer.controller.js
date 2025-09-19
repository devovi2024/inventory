import CustomersModel from "../../models/Customers/customers.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";

export async function createCustomer(req, res) {
    let result = await createService(req, CustomersModel);
    return res.status(result.statusCode).json(result);
}

export async function updateCustomer(req, res) {
    let result = await updateService(req, CustomersModel);
    return res.status(result.statusCode).json(result);
}

export async function listCustomers(req, res) {
    const SearchArray = ["CustomerName", "Phone", "Email"];
    let result = await listService(req, CustomersModel, SearchArray);
    return res.status(result.statusCode).json(result);
}

export async function dropdownCustomers(req, res) {
    const Projection = { _id: 1, CustomerName: 1 };
    let result = await dropdownService(req, CustomersModel, Projection);
    return res.status(result.statusCode).json(result);
}

export default {
    createCustomer,
    updateCustomer,
    listCustomers,
    dropdownCustomers
};
