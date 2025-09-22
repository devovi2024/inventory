import mongoose from "mongoose";

const createParentChildService = async (Request, ParentModel, ChildModel, JoinPropertyName) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let Parent = Request.body["Parent"];
        Parent.UserEmail = Request.headers["email"];
        const parentResult = await ParentModel.create([Parent], { session });

        let Childs = Request.body["Childs"].map(child => {
            child.UserEmail = Request.headers["email"];
            child[JoinPropertyName] = parentResult[0]._id;
            return child;
        });
        const childResult = await ChildModel.insertMany(Childs, { session });

        await session.commitTransaction();
        session.endSession();

        return { status: "success", parent: parentResult, childs: childResult };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", error: error.message };
    }
};

export default createParentChildService;
