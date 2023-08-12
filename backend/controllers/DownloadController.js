import File from "../mongodb/models/File.js";

export async function download (req, res) {
    const { id } = req.params;
    
    const { originalname, directory } = await File.findOne({ id });

    if (!originalname) {
        return res.status(404).json({
            error: true,
            ok: false,
            msg: "File not Find"
        });
    }
    
    try {
        res.download(directory, originalname);
        return res.status(200)
    } catch (error) {
        return res.status(400).json({
            error: true, 
            ok: false,
            msg: error.message
        })
    }
}