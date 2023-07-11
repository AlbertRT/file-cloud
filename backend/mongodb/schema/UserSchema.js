import mongoose from "mongoose";
import moment from "moment";

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        uniqe: true
    },
    default_storage: {
        type: Number,
        default: 1073741824
    },
    storage: {
        type: Number,
        default: 0
    },
    user_folder: {
        type: String,
        required: true
    },
    key: {
        type: String,
        default: ""
    },
    created_on: {
        type: String,
        default: moment().unix()
    }
});

export default UserSchema;