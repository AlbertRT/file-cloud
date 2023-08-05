import { Schema } from "mongoose";

const folderSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true,
    },
    directory: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    date_modified: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export default folderSchema;