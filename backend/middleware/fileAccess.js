import File from "../mongodb/models/File.js"

export async function fileAccess (req, res, next) {
    const { fileId } = req.params

    const { access } = await File.findOne({ id: fileId })

    if (access === 'private') {
        return res.status(400).json({
            error: true,
            ok: false,
            msg: 'This File has not public yet'
        })
    }

    next()
}