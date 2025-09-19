const listService = async (Request, DataModel, SearchArray) => {
    try {
        let pageNo = Number(Request.params.pageNo) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchValue = Request.params.searchKeyword || "0";
        let UserEmail = Request.headers['email'];

        let skipRow = (pageNo - 1) * perPage;
        let data = [];

        if (searchValue !== "0" && SearchArray.length) {
            let searchQuery = { $or: SearchArray.map(field => ({ [field]: { $regex: searchValue, $options: "i" } })) };
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                { $match: searchQuery },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        } else {
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                {
                    $facet: {
                        Total: [{ $count: "count" }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        }

        return {
            statusCode: 200,
            status: "success",
            data: data
        };

    } catch (error) {
        return {
            statusCode: 400,
            status: "fail",
            message: error.message
        };
    }
};

export default listService;
