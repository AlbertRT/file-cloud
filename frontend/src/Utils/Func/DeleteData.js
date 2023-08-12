import axios from 'axios';
const deleteData = async (record) => {
    const id = record.key;
    let url;

    if (record.type !== "folder") {
        url = "http://localhost:5050/user/file/delete";
    } else {
        url = "http://localhost:5050/user/file/folder/delete";
    }

    try {
        await axios.delete(url, { data: { id } });
    } catch (error) {
        console.log(error);
    }
};

export default deleteData