import fs from 'fs/promises';

export async function createFolder(path) {
    try {
        await fs.mkdir(path);
        
        return 1;
    } catch (error) {
        return error.message;
    }
}