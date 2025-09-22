const deleteService = async (Request, Model) => {
    try {
        const deleteID = Request.params.id;
        const UserEmail = Request.headers['email'];

        const query = { _id: deleteID, UserEmail };

        const result = await Model.deleteMany(query);

        return { status: 'success', deletedCount: result.deletedCount };
    } catch (error) {
        return { status: 'fail', error: error.message };
    }
};

export default deleteService;
