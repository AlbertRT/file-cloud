import { readDir } from "../utils/fs.js";
import User from "../mongodb/models/User.js";

export async function readFolder (req, res) {
    const key = req.key;

    if (!key) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: 'Key is Missing'
        });
    }

    const { user_folder } = await User.findOne({ key });

    if (!user_folder) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: 'Folder is not defined'
        });
    }

    try {
        const files = await readDir(`src/folders/${user_folder}`);

        return res.status(200).json({
            ok: true,
            error: false,
            data: files
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        });
    }
}