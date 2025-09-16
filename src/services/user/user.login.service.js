const CreateToken = require("../../utility/CreateToken");

export const userLoginService = async (Request, DataModel) => {
    try {
        let data = await DataModel.aggregate([
            { $match: Request.body }, 
            { $project: { _id: 0, email: 1, firstName: 1, lastName: 1, mobile:1, photo:1 } } 
        ]);

        if (data.length > 0) {
            let token = await CreateToken(data[0].email);

            return {
                statusCode: 200,
                status: "success",
                token: token,
                data: data[0]
            };
        } else {
            return {
                statusCode: 401,
                status: "fail",
                message: "Unauthorized: Invalid credentials"
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            status: "fail",
            message: error.toString()
        };
    }
};
