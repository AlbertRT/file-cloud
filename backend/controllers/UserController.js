import User from "../mongodb/models/User.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import random_string from "../utils/random_string.js";
import { createDir } from "../utils/fs.js";
import moment from 'moment'

export async function register(req, res) {
    let { name, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: 'Password & Confirm Password not match'
        });
    }

    password = await bcrypt.hash(password, 10);

    if (email) {
        let isEmail = validator.isEmail(email);
        if (!isEmail) {
            return res.status(400).json({
                error: true,
                ok: false,
                msg: 'Email is not Valid'
            });
        }
    }

    const userId = random_string(32);
    const folderName = `${userId}`;

    await createDir(`src/folders/${folderName}`);
    await createDir(`src/folders/${folderName}/details`);

    try {
        await User.create({
            id: userId,
            basicInfo: {
                fullName: name,
                user_folder: folderName,
            },
            contactInfo: {
                email
            },
            password: {
                password,
                last_change: moment().unix()
            },
            loginInfo: {
                key: ""
            }
        });
        return res.status(201).json({
            error: false,
            ok: true,
            msg: 'User created with ' + folderName
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}

export async function login(req, res) {
    let { email } = req.body;

    const user = await User.findOne({ 'contactInfo.email': email });

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User not found"
        });
    }

    let clientKey = random_string(64);
    res.cookie('key', clientKey, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000
    });

    clientKey = await bcrypt.hash(clientKey, 10);
    await user.updateOne({
        'loginInfo.key': clientKey
    });

    res.cookie('email', email, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        error: false,
        ok: true,
        data: {
            key: clientKey
        },
        msg: "Login successfully"
    });
}

export async function logout(req, res) {
    const { key, email } = req.cookies

    if (!key || !email) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: "You have been logout"
        });
    }

    const user = await User.findOne({ 'loginInfo.key': req.key });

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User not found"
        });
    }

    res.clearCookie('key');
    res.clearCookie('email');

    await User.updateOne({ 'loginInfo.key': req.key }, { 'loginInfo.key': '', 'loginInfo.last_login': moment().unix() });

    res.status(200).json({
        ok: true,
        error: false,
        msg: "Success to logout"
    });
}

export async function me(req, res) {
    const { key, email } = req.cookies;

    if (!key) {
        return res.status(401).json({
            error: true,
            ok: false,
            msg: "Key is Missing, please Login!"
        });

    }

    const user = await User.findOne({ 'contactInfo.email': email });

    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User not found"
        });
    }

    const data = {
        id: user.id,
        fullName: user.basicInfo.fullName,
        email: user.contactInfo.email,
        default_storage: user.basicInfo.default_storage,
        storage: user.basicInfo.storage,
        user_folder: user.basicInfo.user_folder,
        profile_picture: user.basicInfo.profile_pictures,
        created_on: user.created_on
    }

    return res.status(200).json({
        ok: true,
        error: false,
        data
    });
}