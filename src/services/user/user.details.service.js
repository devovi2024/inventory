const userDetailsService = async (Request, DataModel) => {
    try {
        let data = await DataModel.aggregate([
            { $match: { email: Request.headers['email'] } },
            { $project: { password: 0, __v: 0 } }
        ]);

        if (!data || data.length === 0) {
            return { statusCode: 404, status: "fail", message: "User not found" };
        }

        return { statusCode: 200, status: "success", data: data };
    } catch (error) {
        return { statusCode: 500, status: "fail", message: error.toString() };
    }
};

export default userDetailsService;
