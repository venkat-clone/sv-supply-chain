
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/UserRepository");
const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.cookie;

    if (!token) {
        console.log('No Token Provided');
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const userObj = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userRepository.getUserById(userObj.userId);
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = authMiddleware;