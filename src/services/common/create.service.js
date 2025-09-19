const createService = async (Request, DataModel) => {
    try {
        let PostBody = Request.body;
        PostBody.UserEmail = Request.headers['email'];

        let data = await DataModel.create(PostBody);

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

export default createService;
