
import BrandsModel from "../../models/Brands/brands.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";

class BrandsController {

    static async createBrand(req, res) {
        const result = await createService(req, BrandsModel);
        res.status(result.statusCode).json(result);
    }

    static async updateBrand(req, res) {
        const result = await updateService(req, BrandsModel);
        res.status(result.statusCode).json(result);
    }

    static async listBrand(req, res) {
        const SearchArray = req.SearchArray ? req.SearchArray : [];
        const result = await listService(req, BrandsModel, SearchArray);
        res.status(result.statusCode ? result.statusCode : 200).json(result);
    }

    static async dropdownBrand(req, res) {
        const Projection = { Name: 1, _id: 1 };
        const result = await dropdownService(req, BrandsModel, Projection);
        res.status(result.statusCode ? result.statusCode : 200).json(result);
    }
}

export default BrandsController;
