const listOneJoinService = async (Request, DataModel, SearchArray, JoinStage) => {
    try {
        let pageNo = Number(Request.params.pageNo) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchValue = Request.params.searchKeyword || "";
        let UserEmail = Request.headers['email'];
        let skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue && SearchArray.length) {
            data = await DataModel.aggregate([
                { $match: { UserEmail } },
                { $match: { $or: SearchArray } },
                JoinStage,
                { $skip: skipRow },
                { $limit: perPage }
            ]);
        } else {
            data = await DataModel.aggregate([
                { $match: { UserEmail } },
                JoinStage,
                { $skip: skipRow },
                { $limit: perPage }
            ]);
        }

        return { status: "success", data };

    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
};

export default listOneJoinService;
