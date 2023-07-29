import axios from 'axios';

const Fetcher = async ([url, method, headers = {}]) => {
    const response = await axios({ url, method, headers: { ...headers.headers} });
    return response.data;
}

export default Fetcher;