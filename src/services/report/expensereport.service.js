import ExpenseModel from "../../models/Expenses/expense.model.js";

const expenseReport = async (Request) => {
    try {
        let UserEmail = Request.headers['email'];
        let FormDate = new Date(Request.body['FormDate']);
        let ToDate = new Date(Request.body['ToDate']);

        let data = await ExpenseModel.aggregate([
            {
                $match: {
                    UserEmail: UserEmail,
                    CreateDate: { $gte: FormDate, $lte: ToDate }
                }
            },
            {
                $facet: {
                    Total: [
                        {
                            $group: {
                                _id: null,
                                TotalAmount: { $sum: "$Amount" }
                            }
                        }
                    ],
                    Rows: [
                        {
                            $lookup: {
                                from: "expensetypes",
                                localField: "TypeId",
                                foreignField: "_id",
                                as: "Type"
                            }
                        },
                        {
                            $unwind: {
                                path: "$Type",
                                preserveNullAndEmptyArrays: true
                            }
                        }
                    ]
                }
            }
        ]);

        return data;
    } catch (error) {
        throw error;
    }
};

export default expenseReport;
