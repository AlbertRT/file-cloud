import mongoose from "mongoose";
import fileSchema from "../schema/FileSchema.js";

const File = mongoose.model('file', fileSchema);

export default File;