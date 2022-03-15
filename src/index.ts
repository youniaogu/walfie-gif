#!/usr/bin/env node

import {
  objToForm,
  isSuccess,
  isEmpty,
  getTarget,
  removeQuery,
  getPrefixFromUrl,
  checkDirOrCreate,
} from './utils.js';
import { DownloaderHelper } from 'node-downloader-helper';
import { load } from 'cheerio';
import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';
import chalk from 'chalk';
import path from 'path';

const author = 'walfiegif';
const target = getTarget(author);
const queue: Queue = [];
const output = path.join(process.cwd(), 'download', author);
const limiter = new Bottleneck({
  maxConcurrent: 3,
});

checkDirOrCreate(output);

let page = 0;
while (true) {
  page++;
  console.log(chalk.green(`Start Page ${page}`));

  const response = await fetch(target, {
    method: 'post',
    body: objToForm({
      page,
    }),
  });
  const data = (await response.json()) as Response.Success | Response.Empty;

  if (isSuccess(data)) {
    load(data.html)('img').map((_, element) => {
      const { src, title } = element.attribs;
      const source = removeQuery(src);
      const prefix = getPrefixFromUrl(source);
      queue.push({ source, name: `${title}.${prefix}` });
    });
  } else if (isEmpty(data)) {
    console.log(chalk.greenBright('Page End'));
    break;
  } else {
    console.log(chalk.greenBright(`Page ${page} Fail`), data);
  }
}

queue.forEach((mission) => {
  const { source, name } = mission;

  limiter
    .schedule(() =>
      new DownloaderHelper(source, output, {
        fileName: name,
      }).start()
    )
    .then(() => {
      console.log(chalk.green(`${name} Download Success`));
    })
    .catch((e) => {
      console.log(chalk.red(`${name} Download Fail`), e);
    });
});
