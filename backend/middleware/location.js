import User from "../mongodb/models/User.js";
import random_string from "../utils/random_string.js";

export default async function location(req, res, next) {
    const {pathname} = req.query;
    const key = req.key;
    const { user_folder } = await User.findOne({ key });
    let location

    if (pathname !== 'root') {
        location = `src/folders/${user_folder}${pathname.split('/folder')[1]}`;
        req.location = location
    } else {
        location = `src/folders/${user_folder}`
        req.location = location
    }

    const file_name = random_string(32);
    req.file_name = file_name

    next();
}