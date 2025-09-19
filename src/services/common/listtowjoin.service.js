const listTowJoinService = async (Request, DataModel, SearchArray, JoinStage1, JoinStage2) => {
    try {
        let pageNo = Number(Request.params.pageNo) || 1;
        let perPage = Number(Request.params.perPage) || 10;
        let searchValue = Request.params.searchKeyword || "";
        let UserEmail = Request.headers['email'];
        let skipRow = (pageNo - 1) * perPage;

        let baseStages = [
            { $match: { UserEmail } },
            ...JoinStage1,
            ...JoinStage2
        ];

        if (searchValue && SearchArray.length) {
            baseStages.push({ $match: { $or: SearchArray } });
        }

        baseStages.push({
            $facet: {
                total: [{ $count: "total" }],
                rows: [{ $skip: skipRow }, { $limit: perPage }]
            }
        });

        let data = await DataModel.aggregate(baseStages);

        return { status: "success", data };

    } catch (error) {
        console.error("Error in listTowJoinService:", error);
        return { status: "fail", data: error.toString() };
    }
};

export default listTowJoinService;
