const userUpdateService = async (Request, DataModel) => {
  try {
    const user = await DataModel.findOne({ email: Request.headers['email'] });
    if (!user) 
        return { statusCode: 404, status: 'fail', message: 'User not found', data: null };

    Object.assign(user, Request.body);
    const updatedUser = await user.save();

    return { statusCode: 200, status: 'success', message: 'User updated successfully', data: updatedUser };
  } catch (error) {
    return { statusCode: 500, status: 'error', message: error.message || 'Server Error', data: null };
  }
};

export default userUpdateService;
