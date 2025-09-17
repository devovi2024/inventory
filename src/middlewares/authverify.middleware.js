import jwt from "jsonwebtoken";

const authVerifyMiddleware = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) return res.status(401).json({ status: "unauthorized", message: "Token missing" });

    jwt.verify(token, "SecretKey201002487", (err, decoded) => {
        if (err) return res.status(401).json({ status: "unauthorized", message: "Invalid token" });

        req.headers.email = decoded.data;
        next();
    });
};

export default authVerifyMiddleware;
