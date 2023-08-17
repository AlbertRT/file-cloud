import mongoose from "mongoose";
import moment from "moment";


const ProfilePicture = new mongoose.Schema({
    id: {
        type: String,
        default: ""
    },
    filename: {
        type: String,
        default: ""
    },
    downloadURL: {
        type: String,
        default: ""
    },
    path: {
        type: String,
        default: ""
    }
})

const BasicInfo = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ""
    },
    birthday: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    profile_pictures: {
        type: ProfilePicture,
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
    }
})
const ContactInfo = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        uniqe: true
    },
    phone: {
        type: String, 
        default: ""
    }
})
const AddressInfo = new mongoose.Schema({
    homeAddress: {
        type: String,
        default: ""
    },
    workAddress: {
        type: String, 
        default: ""
    }
})
const LoginInfo = new mongoose.Schema({
    key: {
        type: String, 
        default: ""
    },
    last_login: {
        type: String,
        default: ""
    }
})
const Password = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    last_change: {
        type: String,
         default: moment().unix()
    }
})

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    basicInfo: {
        type: BasicInfo
    },
    contactInfo: {
        type: ContactInfo
    },
    addressInfo: {
        type: AddressInfo
    },
    loginInfo: {
        type: LoginInfo
    },
    password: {
        type: Password
    },
    created_on: {
        type: String,
        default: moment().unix()
    }
});

export default UserSchema;