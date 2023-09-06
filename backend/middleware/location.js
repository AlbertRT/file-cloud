import User from "../mongodb/models/User.js";
import random_string from "../utils/random_string.js";

export default async function location(req, res, next) {
    const { location } = req.body
    console.log(req.body);
    const user = await User.findOne({ 'loginInfo.key': req.key })
    

    let directory

    if (location === "" || location === null) {
        directory = `src/folder/${user.basicInfo.user_folder}`
    } else {
        directory = `${location}`
    }

    req.location = directory
    req.file_name = random_string(32)

    // next();
}