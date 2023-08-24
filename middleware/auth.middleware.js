const jwt = require('jsonwebtoken');
require('dotenv').config();
const { UserModel } = require("../model/user.model");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ msg: "Authorization token missing" });
        }

        const decodedToken = jwt.verify(token, process.env.TOKENKEY);
        const { userId } = decodedToken;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }

        // Attach the user object to the request for further use
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: "Unauthorized" });
    }
}

module.exports = {
    authenticate
};
