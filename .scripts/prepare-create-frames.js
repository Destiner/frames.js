/**
 * This script is used to prepare create-frames package for publishing.
 *
 * It copies the templates directory to the root of the package so that it can be used by the create-frames package.
 */

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import * as fse from "@ndelangen/fs-extra-unified";
import glob from "fast-glob";
import { rimraf } from "rimraf";
import { renameSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

await rimraf(resolve(__dirname, "../packages/create-frames/templates"));

await fse.copy(
  resolve(__dirname, "../templates"),
  resolve(__dirname, "../packages/create-frames/templates"),
  {
    filter: (src) => !/(node_modules|\.turbo\/|\.next\/)/.test(src),
  }
);

const dotfiles = await glob(
  resolve(__dirname, "../packages/create-frames/templates/**/.*")
);

// rename dotfiles to use underscore instead of dot so we can publish them to npm as is
for (const doftile of dotfiles) {
  renameSync(doftile, doftile.replace("/.", "/_"));
}
