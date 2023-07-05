import fs from 'fs';
import path from 'path';

export async function createFolder(path) {
    try {
        await fs.promises.mkdir(path);

        return 1;
    } catch (error) {
        return error.message;
    }
}

function getItemInfo(itemPath) {
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
        const items = [];

        for (const file of files) {
            const itemPath = path.join(folderPath, file);
            const item = await getItemInfo(itemPath);
            items.push(item);
        }
        console.log(items);

        return items;
    } catch (err) {
        return err;
    }
}
