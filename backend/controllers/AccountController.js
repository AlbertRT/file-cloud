import User from "../mongodb/models/User.js"
import { unlinkFile } from "../utils/fs.js";

export async function accountDetails(req, res) {

}

export async function editInfo(req, res) {

}

export async function profile_picture_update(req, res) {
    const downloadURL = `http://localhost:5050/pp/${req.file.filename.split(".")[0]}`

    try {
        await User.updateOne({ 'loginInfo.key': req.key }, { 'basicInfo.profile_pictures.downloadURL': downloadURL, 'basicInfo.profile_pictures.id': req.file.filename.split(".")[0], 'basicInfo.profile_pictures.filename': req.file.filename, 'basicInfo.profile_pictures.path': req.file.path});

        return res.status(204).json({
            ok: true,
            error: false,
            msg: "Profile Picture updated"
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        })
    }
}

export async function getProfilePicture(req, res) {
    const { fileName } = req.params;
    const profile_picture = await User.findOne({ 'basicInfo.profile_pictures.id': fileName })

    const { basicInfo } = profile_picture

    try {
        res.download( basicInfo.profile_pictures.path, basicInfo.profile_pictures.filename )
        return res.status(200)
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        })
    }
}

export async function deleteProfilePicture(req, res) {
    const { basicInfo, id } = await User.findOne({ 'loginInfo.key': req.key })
    try {
        await unlinkFile(basicInfo.profile_pictures.path);
        await User.updateOne({ id }, { 'basicInfo.profile_pictures.downloadURL': '', 'basicInfo.profile_pictures.filename': '', 'basicInfo.profile_pictures.id': '', 'basicInfo.profile_pictures.path': ''  })

        return res.status(200).json({
            ok: true,
            error: false,
            msg: 'Profile Picture deleted'
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        })
    }
}

export async function deleteAccount(req, res) {

}