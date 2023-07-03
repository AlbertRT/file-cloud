import mongoose from "mongoose";

async function connect ({ uri }) {
    if (!uri) {
        return console.error('uri is empty');
    }

    console.log('connecting to db');

    try {
        await mongoose.connect(uri, { useNewURLParser: true });
        console.log('connection success!');
    } catch (error) {
        return Promise.reject(error);
    }
}

export default connect