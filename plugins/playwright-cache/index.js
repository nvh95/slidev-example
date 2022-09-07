// https://mxb.dev/blog/persistent-build-folders-netlify/

const path = require("path");
const os = require("os");

// https://github.com/microsoft/playwright/blob/b6bc8b654d4bee7460256b65b1cf4eb3f1b889ad/packages/playwright-core/src/server/registry/index.ts#L229-L230
const CACHE_LOCATION = path.join(
  process.env.XDG_CACHE_HOME || path.join(os.homedir(), ".cache"),
  "ms-playwright"
);

console.log("CACHE_LOCATION", CACHE_LOCATION);

module.exports = {
  // Before the build runs,
  // restore a directory we cached in a previous build.
  // Does not do anything if:
  //  - the directory already exists locally
  //  - the directory has never been cached
  async onPreBuild({ utils }) {
    await utils.cache.restore(CACHE_LOCATION);
  },
  // After the build is done,
  // cache directory for future builds.
  // Does not do anything if:
  //  - the directory does not exist
  async onPostBuild({ utils }) {
    await utils.cache.save(CACHE_LOCATION);
  },
};
