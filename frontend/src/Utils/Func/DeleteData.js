import axios from 'axios';
const deleteData = async ({ key, type }) => {
    let url;

    if (type !== "folder") {
        url = "http://localhost:5050/user/file/delete";
    } else {
        url = "http://localhost:5050/user/file/folder/delete";
    }

    try {
        await axios.delete(url, { data: { id: key } });
        return 1
    } catch (error) {
        console.log(error);
    }
};

export default deleteData