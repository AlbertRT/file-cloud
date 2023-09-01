import axios from 'axios';

const Fetcher = {
    get:  async (url) => {
        const {data} = await axios.get(url)
        return data
    },
    post: async (url, data, headers = {}) => {
        const { data: res } = await axios.post(url, ...data, ...headers)
        return res
    }
}

export default Fetcher