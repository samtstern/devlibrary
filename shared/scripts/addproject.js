/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require("fs");
const path = require("path");
const { URL } = require("url");

function getConfigDir() {
  const dir = path.dirname(__filename);
  return path.resolve(dir, "../../config");
}

function addBlog(product, projectUrl) {
  const re = /medium.com\/([\w\-]+)\/([\w\-]+)/
  const m = projectUrl.match(re);

  const slug = m[2];

  const templateStr = fs.readFileSync(path.join(getConfigDir(), "template-blog.json")).toString();
  const blogFileContent = JSON.parse(templateStr);

  blogFileContent.link = projectUrl;

  const blogFilePath = path.join(getConfigDir(), product, 'blogs', `${slug}.json`);
  
  console.log(`Writing new file: ${blogFilePath}`);
  fs.writeFileSync(blogFilePath, JSON.stringify(blogFileContent, undefined, 2));
}

function addRepo(product, projectUrl) {
  const re = /github.com\/([\w\-]+)\/([\w\-]+)/
  const m = projectUrl.match(re);

  const owner = m[1];
  const repo = m[2];

  const templateStr = fs.readFileSync(path.join(getConfigDir(), "template-repo.json")).toString();
  const repoFileContent = JSON.parse(templateStr);

  repoFileContent.owner = owner;
  repoFileContent.repo = repo;

  const repoFilePath = path.join(getConfigDir(), product, 'repos', `${owner}-${repo}.json`);
  
  console.log(`Writing new file: ${repoFilePath}`);
  fs.writeFileSync(repoFilePath, JSON.stringify(repoFileContent, undefined, 2));
}

function main() {
  if (process.argv.length < 4) {
    console.error("Missing required arguments:\nnpm run addproject <product> <url>");
    return;
  }
  
  const product = process.argv[2];
  const projectUrl = process.argv[3];

  console.log(`Product: ${product}`);
  console.log(`Project: ${projectUrl}`);

  if (projectUrl.includes("github.com")) {
    addRepo(product, projectUrl);
  } else if (projectUrl.includes("medium.com")) {
    addBlog(product, projectUrl);
  } else {
    console.error("Unknown project source, must be a GitHub repo or Medium post");
  }
}

main();
