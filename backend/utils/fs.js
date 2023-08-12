import fs from 'fs';
import path from 'path';

export async function createDir(path) {
    try {
        await fs.promises.mkdir(path);

        return 1;
    } catch (error) {
        return error.message;
    }
}

export function getItemInfo(itemPath) {
    return new Promise((resolve, reject) => {
        fs.stat(itemPath, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }

            const type = stats.isDirectory() ? 'folder' : `file/${path.basename(itemPath).split('.')[1]}`;

            const item = {
                type,
                name: path.basename(itemPath),
                created: stats.birthtimeMs,
                size: stats.size
            };

            resolve(item);
        });
    });
}

export async function readDir(folderPath) {
    try {
        const files = await fs.promises.readdir(folderPath);
        return files;
    } catch (err) {
        throw new Error(err);
    }
}

export async function rename(path, newPath) {
    try {
        await fs.promises.rename(path, newPath);

        return 1;
    } catch (error) {
        throw new Error(error);
    }
}
export async function rmFolder(path) {
    try {
        await fs.promises.rm(path, { force: true, recursive: true });

        return 1;
    } catch (error) {
        throw new Error(error);
    }
}

export async function unlinkFile(path) {
    try {
        await fs.promises.unlink(path);

        return 1;
    } catch (error) {
        throw new Error(error);
    }
}