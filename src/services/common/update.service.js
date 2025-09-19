const updateService = async (Request, DataModel) => {
    try {
        const UserEmail = Request.headers['email'];
        const id = Request.params.id;
        const PostBody = Request.body;

        const data = await DataModel.updateOne(
            { _id: id, UserEmail: UserEmail },
            { $set: PostBody }
        );

        if (data.matchedCount === 0) {
            return {
                statusCode: 404,
                status: "fail",
                message: "No document found to update"
            };
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

export default updateService;
