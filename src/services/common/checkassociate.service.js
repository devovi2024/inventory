const checkAssociateService = async (QueryObject, AssociateModel) => {
    try {
        const data = await AssociateModel.aggregate([
            { $match: QueryObject }
        ]);
        return data.length > 0;
    } catch (error) {
        return false;
    }
};

export default checkAssociateService;
