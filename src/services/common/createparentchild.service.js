import mongoose from "mongoose";

const createParentChildService = async (Request, ParentModel, ChildModel, JoinPropertyName) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        let Parent = Request.body["Parent"];
        Parent.UserEmail = Request.headers["email"];

        let parentResult;
        try {
            parentResult = await ParentModel.create([Parent], { session });
        } catch (error) {
            parentResult = { error: "Parent creation failed", details: error.toString() };
        }

        let childResult;
        try {
            let Childs = Request.body["Childs"];
            Childs = Childs.map(child => {
                child.UserEmail = Request.headers["email"];
                if (parentResult && parentResult[0]?._id) child[JoinPropertyName] = parentResult[0]._id;
                return child;
            });
            childResult = await ChildModel.insertMany(Childs, { session });
        } catch (error) {
            childResult = { error: "Child creation failed", details: error.toString() };
        }

        await session.commitTransaction();
        session.endSession();

        return { status: "completed", parent: parentResult, childs: childResult };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return { status: "fail", data: error.toString() };
    }
};

export default createParentChildService;
