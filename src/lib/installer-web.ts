// The web installer's switch (installer-web.env at the repository's root),
// read at build time. Off, the draft page /install/web/ is not built, and
// scripts/installer-web.sh fetches nothing for /install/web/app/.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function read(): Record<string, string> {
  const values: Record<string, string> = {};
  for (const line of readFileSync(resolve("installer-web.env"), "utf8").split("\n")) {
    const m = /^(INSTALLER_WEB(?:_TAG|_SHA256)?)=([A-Za-z0-9._-]*)$/.exec(line.trim());
    if (m) values[m[1]] = m[2];
  }
  return values;
}

const conf = read();
if (conf.INSTALLER_WEB !== "on" && conf.INSTALLER_WEB !== "off") {
  throw new Error(`installer-web.env: INSTALLER_WEB must be on or off, not ${JSON.stringify(conf.INSTALLER_WEB)}`);
}
export const INSTALLER_WEB_ON = conf.INSTALLER_WEB === "on";
export const INSTALLER_WEB_TAG = conf.INSTALLER_WEB_TAG ?? "";
