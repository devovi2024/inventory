import PurchaseProductModel from "../../models/Purchase/purchaseProduct.model.js";

const purchaseReportService = async (Request) => {
    try {
        let UserEmail = Request.headers['email'];
        let FormDate = new Date(Request.body['FormDate']);
        let ToDate = new Date(Request.body['ToDate']);

        let data = await PurchaseProductModel.aggregate([
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
                                _id: 0,
                                TotalAmount: { $sum: "$Total" }
                            }
                        }
                    ],
                    Rows: [
                        {
                            $lookup: {
                                from: 'products',
                                localField: 'ProductID',
                                foreignField: '_id',
                                as: 'products'
                            }
                        },
                        { $unwind: { path: "$products", preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: "brands",
                                localField: "products.BrandID",
                                foreignField: "_id",
                                as: "brand"
                            }
                        },
                        {
                            $lookup: {
                                from: "categories",
                                localField: "products.CategoryID",
                                foreignField: "_id",
                                as: "category"
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

export default purchaseReportService;
