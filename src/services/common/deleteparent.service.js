import mongoose from "mongoose";

const deleteParentChildService = async (Request, ParentModel, ChildModel, joinPropertyName) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const DeleteID = Request.params.id;
        const UserEmail = Request.headers["email"];

        const ChildQueryObject = {};
        ChildQueryObject[joinPropertyName] = DeleteID;
        ChildQueryObject["email"] = UserEmail;

        const ParentQueryObject = {};
        ParentQueryObject["_id"] = DeleteID;
        ParentQueryObject["email"] = UserEmail;

        const ChildsDelete = await ChildModel.deleteMany(ChildQueryObject).session(session);
        const ParentDelete = await ParentModel.deleteOne(ParentQueryObject).session(session);

        await session.commitTransaction();
        session.endSession();

        return { status: "success", Parent: ParentDelete, Childs: ChildsDelete };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

export default deleteParentChildService;
