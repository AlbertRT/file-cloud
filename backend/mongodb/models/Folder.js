import mongoose from "mongoose";
import folderSchema from "../schema/UserFolderSchema.js";

const Folder = mongoose.model('folders', folderSchema);

export default Folder;