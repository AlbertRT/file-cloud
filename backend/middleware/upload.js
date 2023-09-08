import User from "../mongodb/models/User.js";
import random_string from "../utils/random_string.js";
import formidable from 'formidable'
import fs from 'fs/promises'

export default async function upload(req, res, next) {
    const user = await User.findOne({ 'loginInfo.key': req.key })
    const form = formidable({})
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return console.log(err)
        }
        const json = JSON.parse(fields.meta_data)
        const { location } = json
        const { image } = files

        let directory

        const filename = `${random_string(32)}.${image[0].originalFilename.split('.')[1]}`
        if (location === "" || location === null) {
            directory = `src/folders/${user.basicInfo.user_folder}/${filename}`
        } else {
            directory = `${location}/${filename}`
        }

        const file = {
            originalname: image[0].originalFilename,
            filename,
            path: directory,
            size: image[0].size,
            mimetype: image[0].mimetype,
            lastModifiedDate: image[0].lastModifiedDate,
            hashAlgorithm: image[0].hashAlgorithm,
            hash: image[0].hash
        } 

        try {
            await fs.copyFile(image[0].filepath, directory)
            req.meta_data = json
            req.file = file
            next();
        } catch (error) {
            console.log(error);
        }
    })
}