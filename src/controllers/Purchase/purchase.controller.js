import ParentModel from "../../models/Purchase/purchase.model.js";
import ChildModel from "../../models/Purchase/purchaseproduct.model.js";
import createParentChildService from "../../services/common/createparentchild.service.js";
import deleteParentChildService from "../../services/common/deleteparent.service.js";

const createPurchase = async (req, res) => {
    try {
        const result = await createParentChildService(req, ParentModel, ChildModel, "PurchaseID");

        if (result.parent?.error) {
            return res.status(400).json({
                message: "Parent creation failed",
                details: result.parent.details || null,
            });
        }

        if (result.childs?.error) {
            return res.status(400).json({
                message: "Child creation failed",
                details: result.childs.details || null,
            });
        }

        return res.status(201).json({
            message: "Purchase and products created successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const purchaseList = async (req, res) => {
    try {
        const searchKeyword = req.params.searchKeyword || "";
        const SearchRgx = { $regex: searchKeyword, $options: "i" };

        const SearchArray = [
            { VatTax: SearchRgx },
            { Discount: SearchRgx },
            { OtherCost: SearchRgx },
            { GrandTotal: SearchRgx },
        ];

        const data = await ParentModel.aggregate([
            { $match: { $or: SearchArray } },
            {
                $lookup: {
                    from: "suppliers",
                    localField: "SupplierID",
                    foreignField: "_id",
                    as: "Supplier",
                },
            },
        ]);

        return res.status(200).json({
            message: "Purchase List fetched successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const purchaseDelete = async (req, res) => {
    try {
        const Result = await deleteParentChildService(req, ParentModel, ChildModel, "PurchaseID");
        return res.status(200).json(Result);
    } catch (error) {
        return res.status(500).json({
            message: "Delete failed",
            error: error.message,
        });
    }
};

export default { createPurchase, purchaseList, purchaseDelete };
