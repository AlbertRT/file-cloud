import User from "../mongodb/models/User.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import random_string from "../utils/random_string.js";
import { createFolder } from "../utils/fs.js";
import moment from "moment";

export async function register(req, res) {
    let { username, email, password, confirm_password } = req.body;

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
    const folderName = `${userId}-${moment().unix()}`

    await createFolder(`src/folders/${folderName}`);
    await createFolder(`src/folders/${folderName}/root`);

    try {
        await User.create({
            id: userId,
            username,
            password,
            email,
            user_folder: folderName
        });
        return res.status(201).json({
            error: false,
            ok: true,
            msg: 'User created with ' + folderName
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}