const userCreateService = async (Request, DataModel) => {
    try {
        let PostBody = Request.body;
        if (!PostBody || !PostBody.email) {
            return { statusCode: 400, status: "fail", message: "Email is required" };
        }

        let data = await DataModel.create(PostBody);
        return { statusCode: 201, status: "success", message: "User created successfully", data: data };
    } catch (error) {
        return { statusCode: 500, status: "fail", message: error.toString() };
    }
};

export default userCreateService;
