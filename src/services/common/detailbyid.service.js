import mongoose from "mongoose";

const detailByIDService = async (Request, DataModel) => {
    try {
        let DetailsID = Request.params.id;
        let UserEmail = Request.headers['email'];

        const ObjectId = mongoose.Types.ObjectId;
        let QueryObject = {};
        QueryObject['_id'] = new ObjectId(DetailsID);
        QueryObject['UserEmail'] = UserEmail;

        let data = await DataModel.aggregate([
            { $match: QueryObject }
        ]);

        return { status: "success", data: data };
    } catch (error) {
        return { status: "fail", data: error.toString() };
    }
}

export default detailByIDService;