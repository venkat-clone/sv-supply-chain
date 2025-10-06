const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");

const register = async (req, res, next) => {
    console.debug(`[AuthController] Registering user`, req.zBody);
    try {
        const newUser = await AuthService.register(req.zBody);
        console.log(`[AuthController] Successfully registered user: ${newUser.id}`);
        res.cookie('token', newUser.token, {
            // httpOnly: true,
            secure: true || process.env.NODE_ENV === 'production',
            // sameSite: 'None',
            maxAge: 1000 * 60 * 60 * 24 * 7
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(`[AuthController] Error registering user`, error);

        next(error);
    }
};

const login = async (req, res, next) => {
    console.debug(`[AuthController] Logging in user`, req.zBody);
    try {
        const { phone, password } = req.zBody;
        const user = await AuthService.login(phone, password);
        console.log(`[AuthController] Successfully logged in user: ${user.id}`);
        res.cookie('token', user.token, {
            httpOnly: false,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7 
        });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(`[AuthController] Error logging in user`, error);
        next(error);
    }
};
const getProfile = async (req, res, next) => {
    console.debug(`[AuthController] Getting user profile`, req.user); 
    try {
        const user = await UserService.getUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(`[AuthController] Successfully retrieved user profile: ${user.id}`);
        res.status(200).json(user);
    } catch (error) {
        console.error(`[AuthController] Error getting user profile`, error);
        next(error);
    }
};
module.exports = {
    register,
    login,
    getProfile,
};
