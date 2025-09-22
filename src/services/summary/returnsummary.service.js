import ReturnModel from '../../models/Return/return.model'

const returnSummaryService = async (Request) => {
    try {
        let UserEmail = Request.headers['email'];
        let data = await ReturnModel.aggregate([
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
        ]);
        return data;
    } catch (error) {
        throw error;
    }
}

export default returnSummaryService