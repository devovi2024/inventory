import ParentModel from "../../models/Return/return.model.js";
import ChildModel from "../../models/Return/returnproduct.model.js";
import createParentChildService from "../../services/common/createparentchild.service.js";

const createReturn = async (req, res) => {
    try {
        const result = await createParentChildService(req, ParentModel, ChildModel, "ReturnID");
        if (result.parent.error) 
            return res.status(400).json({ message: "Parent creation failed", details: result.parent.details });
        if (result.childs.error) 
            return res.status(400).json({ message: "Child creation failed", details: result.childs.details });
        return res.status(201).json({ message: "Return created successfully", data: result });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const returnList = async (req, res) => {
    try {
        const SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
        const SearchArray = [{ Note: SearchRgx }, { GrandTotal: SearchRgx }];
        const data = await ParentModel.aggregate([
            { $match: { $or: SearchArray } },
            { $lookup: { from: "customers", localField: "CustomerID", foreignField: "_id", as: "Customer" } }
        ]);
        return res.status(200).json({ message: "Return List fetched successfully", data });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export default { createReturn, returnList };
