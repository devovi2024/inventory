const dropdownService = async (Request, DataModel, Projection) => {
    try {
        let userEmail = Request.headers['email'];
        let data = await DataModel.aggregate([
            { $match: { UserEmail: userEmail } },
            { $project: Projection }
        ]);
        return { status: "success", data: data };
    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
}
export default dropdownService;
