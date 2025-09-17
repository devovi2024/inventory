import jwt from "jsonwebtoken";

const CreateToken = async (data) => {
    let payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data };
    return jwt.sign(payload, "your_secret_key");
};

export default CreateToken;
