import { Schema } from 'mongoose';

const fileSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    originalname: String,
    mimetype: String,
    filename: String,
    directory: {
        type: String,
        required: true
    },
    size: Number,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date_modified: String,
    url: String,
    author: {
        type: String,
        required: true
    },
    access: {
        type: String,
        required: true,
        default: 'private'
    },
    folderId: {
        type: String,
        required: false,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    altText: {
        type: String,
        default: ""
    }
});

export default fileSchema;