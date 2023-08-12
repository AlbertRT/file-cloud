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
    originalname: {
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
    author: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export default folderSchema;