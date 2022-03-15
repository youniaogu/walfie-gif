import { FormData } from 'node-fetch';
import fs from 'fs';
export function objToForm(obj) {
    const form = new FormData();
    for (const key in obj) {
        form.append(key, obj[key]);
    }
    return form;
}
export function isSuccess(data) {
    return data.type === 'success';
}
export function isEmpty(data) {
    return data.type === 'empty';
}
export function getTarget(author) {
    return `https://${author}.wordpress.com/?infinity=scrolling`;
}
export function removeQuery(url) {
    return url.split('?')[0];
}
export function getPrefixFromUrl(url) {
    return url.split('.').pop();
}
export function checkDirOrCreate(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
    }
}
