import { FormData } from 'node-fetch';
import fs from 'fs';

export function objToForm(obj) {
  const form = new FormData();
  for (const key in obj) {
    form.append(key, obj[key]);
  }
  return form;
}

export function isSuccess(data): data is Response.Success {
  return data.type === 'success';
}

export function isEmpty(data): data is Response.Empty {
  return data.type === 'empty';
}

export function getTarget(author: string): string {
  return `https://${author}.wordpress.com/?infinity=scrolling`;
}

export function removeQuery(url: string): string {
  return url.split('?')[0];
}

export function getPrefixFromUrl(url): string {
  return url.split('.').pop();
}

export function checkDirOrCreate(path): void {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}
