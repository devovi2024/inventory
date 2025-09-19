const dropdownService = async (Request, DataModel, Projection) => {
    try {
        let userEmail = Request.headers['email'];
        let data = await DataModel.aggregate([
            { $match: { UserEmail: userEmail } },
            { $project: Projection }
        ]);

        return { statusCode: 200, status: "success", data: data };
    } catch (error) {
        return { statusCode: 400, status: "fail", message: error.message };
    }
};

export default dropdownService;
