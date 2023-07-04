import mongoose from "mongoose";
import UserSchema from '../schema/UserSchema.js'

const User = mongoose.model('users', UserSchema);

export default User;