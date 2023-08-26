import User from "../mongodb/models/User.js"
import { unlinkFile } from "../utils/fs.js";

export async function accountDetails(req, res) {
    const { key } = req
    const user = await User.findOne({ 'loginInfo.key': key })
    
    if (!user) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "User not Found"
        })
    }

    const { basicInfo, contactInfo, password, id } = user

    const basic_info = {
        fullName: basicInfo?.fullName,
        username: basicInfo?.username,
        birthday: basicInfo?.birthday,
        gender: basicInfo?.gender,
        profile_picture: basicInfo?.profile_pictures
    }
    const contact_info = {
        email: contactInfo?.email,
        phone: contactInfo?.phone
    }

    return res.status(200).json({
        ok: true,
        error: false,
        data: {
            basic_info,
            contact_info,
            id
            
        }
    })
}

export async function editInfo(req, res) {
    const { basicInfo } = req.body
    console.log(basicInfo);

    const me = await User.findOne({ 'loginInfo.key': req.key })

    if (!me) return res.status(404).json({ error: true, ok: false, msg: 'User not Found' })
   
    let usn = basicInfo.username
    let regex = /^@/
    if (!regex.test(usn)) {
        usn = `@${usn}`
    }

    try {
        await User.updateOne({ 'loginInfo.key': req.key }, {
            'basicInfo.fullName': basicInfo.fullName,
            'basicInfo.username': usn,
            'basicInfo.gender': basicInfo.gender,
            'basicInfo.birthday': basicInfo.birthday
        })
        return res.status(200).json({
            ok: true,
            error: true,
            msg: 'Successfully Update user'
        })
    } catch (error) {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: error.message
        })
    }
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