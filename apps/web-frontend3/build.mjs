import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { cp } from "node:fs/promises";

const exec = promisify(execFile);

await exec(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["tsc", "-p", "tsconfig.json"],
    { stdio: "inherit" }
);

await cp("extensions", "dist/extensions", {
    recursive: true
});
