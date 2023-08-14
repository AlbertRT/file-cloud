import axios from "axios"

const renameData = async (data) => {
    try {
        await axios.patch('http://localhost:5050/user/file/rename')
    } catch (error) {
        
    }
}

export default renameData