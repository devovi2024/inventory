import PurchaseModel from '../../models/Purchase/purchase.model.js'
import SalesModel from '../../models/Sales/sales.model.js'

const purchaseSalesSummaryService = async (Request) => {
    try {
        let UserEmail = Request.headers['email'];

        let [purchaseSummary, salesSummary] = await Promise.all([
            PurchaseModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                {
                    $facet: {
                        Total: [
                            {
                                $group: {
                                    _id: 0,
                                    TotalAmount: { $sum: "$Amount" }
                                }
                            }
                        ],
                        Last30Days: [
                            {
                                $group: {
                                    _id: {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$createdAt"
                                        }
                                    },
                                    TotalAmount: { $sum: "$Amount" }
                                }
                            },
                            { $sort: { _id: -1 } },
                            { $limit: 30 }
                        ]
                    }
                }
            ]),
            SalesModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                {
                    $facet: {
                        Total: [
                            {
                                $group: {
                                    _id: 0,
                                    TotalAmount: { $sum: "$Amount" }
                                }
                            }
                        ],
                        Last30Days: [
                            {
                                $group: {
                                    _id: {
                                        $dateToString: {
                                            format: "%Y-%m-%d",
                                            date: "$createdAt"
                                        }
                                    },
                                    TotalAmount: { $sum: "$Amount" }
                                }
                            },
                            { $sort: { _id: -1 } },
                            { $limit: 30 }
                        ]
                    }
                }
            ])
        ]);

        return {
            purchaseSummary,
            salesSummary
        };
    } catch (error) {
        throw error;
    }
}

export default purchaseSalesSummaryService