import ParentModel from "../../models/Sales/sales.model.js";
import ChildModel from "../../models/Sales/salesproduct.model.js";
import createParentChildService from "../../services/common/createparentchild.service.js";
import listOneJoinService from "../../services/common/listonejoin.service.js";
import deleteParentChildService from "../../services/common/deleteparent.service.js";

const createSales = async (req, res) => {
    try {
        const result = await createParentChildService(req, ParentModel, ChildModel, "SalesID");

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
            message: "Sales and products created successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const salesList = async (req, res) => {
    try {
        const searchKeyword = req.params.searchKeyword || "";
        const SearchRgx = { $regex: searchKeyword, $options: "i" };

        const SearchArray = [
            { Note: SearchRgx },
            { "Customer.CustomerName": SearchRgx },
            { "Customer.Address": SearchRgx },
        ];

        const JoinStage = {
            $lookup: {
                from: "customers",
                localField: "CustomerID",
                foreignField: "_id",
                as: "Customer",
            },
        };

        const result = await listOneJoinService(req, ParentModel, SearchArray, JoinStage);

        return res.status(200).json({
            message: "Sales List fetched successfully",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const salesDelete = async (req, res) => {
    try {
        const Result = await deleteParentChildService(req, ParentModel, ChildModel, "SalesID");
        return res.status(200).json(Result);
    } catch (error) {
        return res.status(500).json({
            message: "Delete failed",
            error: error.message,
        });
    }
};

export default { createSales, salesList, salesDelete };
