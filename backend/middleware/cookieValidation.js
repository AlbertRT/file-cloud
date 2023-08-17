import User from "../mongodb/models/User.js";
import bcrypt from "bcrypt";

export async function cookieValidation(req, res, next) {
    let { key,email } = req.cookies;

    if (!key) {
        return res.status(403).json({
            error: true,
            ok: false,
            msg: 'Key is not provided, please login'
        });
    }

    const user = await User.findOne({ 'contactInfo.email': email });
    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: 'User not found'
        });
    }

    // validate the key that sent from client with key in database
    const compared = await bcrypt.compare(key, user.loginInfo.key);
    
    if (!compared) {
        return res.status(401).json({
            error: true,
            ok: false,
            msg: 'your key is invalid, please login again'
        });
    }

    req.key = user.loginInfo.key;
    req.userId = user.id;
    req.folder_name = user.basicInfo.user_folder;
    next();
}