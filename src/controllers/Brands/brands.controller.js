import mongoose from "mongoose";
import BrandsModel from "../../models/Brands/brands.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listService from "../../services/common/list.service.js";
import dropdownService from "../../services/common/dropdown.service.js";
import checkAssociateService from "../../services/common/checkassociate.service.js";
import deleteService from "../../services/common/delete.service.js";
import ProductModel from "../../models/Products/product.model.js";

export const createBrand = async (req, res) => {
    const result = await createService(req, BrandsModel);
    res.status(result.statusCode).json(result);
};

export const updateBrand = async (req, res) => {
    const result = await updateService(req, BrandsModel);
    res.status(result.statusCode).json(result);
};

export const listBrand = async (req, res) => {
    const SearchArray = ["Name"]; 
    const result = await listService(req, BrandsModel, SearchArray);
    res.status(result.statusCode).json(result);
};

export const dropdownBrand = async (req, res) => {
    const Projection = { Name: 1, _id: 1 };
    const result = await dropdownService(req, BrandsModel, Projection);
    res.status(result.statusCode).json(result);
};

export const deleteBrand = async (req, res) => {
    try {
        const DeleteID = req.params.id;
        const ObjectId = mongoose.Types.ObjectId;

        const isAssociated = await checkAssociateService(
            { BrandID: ObjectId(DeleteID) }, 
            mongoose.model("products")
        );

        if (isAssociated) {
            return res.status(400).json({ 
                status: "fail", 
                message: "Brand is associated with some products. Cannot delete." 
            });
        }

        const result = await deleteService(req, ProductModel);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ status: "fail", error: error.message });
    }
};

export default {
    createBrand,
    updateBrand,
    listBrand,
    dropdownBrand,
    deleteBrand
};
