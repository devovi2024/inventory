import ExpenseModel from "../../models/Expenses/expense.model.js";
import createService from "../../services/common/create.service.js";
import updateService from "../../services/common/update.service.js";
import listOneJoinService from "../../services/common/listonejoin.service.js";
import deleteService from "../../services/common/delete.service.js";

export async function createExpense(req, res) {
    let result = await createService(req, ExpenseModel);
    return res.status(result.statusCode).json(result);
}

export async function updateExpense(req, res) {
    let result = await updateService(req, ExpenseModel);
    return res.status(result.statusCode).json(result);
}

export async function expenseList(req, res) {
    try {
        let searchKeyword = req.params.searchKeyword || "";
        let SearchRgx = { $regex: searchKeyword, $options: "i" };
        let SearchArray = [
            { Note: SearchRgx },
            { Amount: SearchRgx }
        ];
        let JoinStage = {
            $lookup: {
                from: "expensetypes",
                localField: "TypeID",
                foreignField: "_id",
                as: "TypeDetails"
            }
        };
        let Result = await listOneJoinService(req, ExpenseModel, SearchArray, JoinStage);
        return res.status(Result.statusCode).json(Result);
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.toString() });
    }
}

export async function deleteExpense(req, res) {
    try {
        const result = await deleteService(req, ExpenseModel);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ status: "fail", error: error.message });
    }
}

export default {
    createExpense,
    updateExpense,
    expenseList,
    deleteExpense
};
