import User from "../mongodb/models/User.js";
import random_string from "../utils/random_string.js";

export default async function location(req, res, next) {
    let {pathname} = req.query;
    const key = req.key;
    const { basicInfo } = await User.findOne({ 'loginInfo.key': key });
    const { user_folder } = basicInfo
    
    let location

    if (pathname === '/') {
        pathname = 'root'
    } else {
        pathname = pathname
    }

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