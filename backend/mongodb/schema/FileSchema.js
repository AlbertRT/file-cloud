import { Schema } from 'mongoose';

const authorSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: false
    }
})

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
        type: Object
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