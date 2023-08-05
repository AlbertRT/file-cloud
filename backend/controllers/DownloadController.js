import File from "../mongodb/models/File.js";

export async function download (req, res) {
    const { id } = req.params;

    const { fileName, path } = await File.findOne({ id });

    if (!fileName) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "File not Find"
        });
    }
    
    try {
        res.download(path, fileName);
        return res.status(200)
    } catch (error) {
        return res.status(400).json({
            error: true, 
            ok: false,
            msg: error.message
        })
    }
}