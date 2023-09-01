import axios from 'axios';
import { revalidateLiveQueries } from './RevalidateLiveQueries';
const deleteData = async (data) => {
    let url;

    let type = data?.type || data?.mimetype
    let key = data?.key || data?.id

    if (type.toLowerCase() !== "folder") {
        url = "http://localhost:5050/user/file/delete";
    } else {
        url = "http://localhost:5050/user/file/folder/delete";
    }

    try {
        await axios.delete(url, { data: { id: key } });
        await revalidateLiveQueries()
        return 1
    } catch (error) {
        console.log(error);
    }
};

export default deleteData