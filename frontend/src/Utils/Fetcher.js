import axios from 'axios';

const Fetcher = async ([url, method, data={}, headers = {}]) => {
    const response = await axios({ url, method, data: { ...data.data },  headers: { ...headers.headers} });
    return response.data;
}

export default Fetcher;