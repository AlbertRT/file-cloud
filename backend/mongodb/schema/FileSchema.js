import { Schema } from 'mongoose';

const fileSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    originalName: String,
    mimetype: String,
    fileName: String,
    path: String,
    size: Number,
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    date_modified: String,
    url: String,
    folderId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'folders'
    }
});

export default fileSchema;