import { readdirSync, renameSync, statSync } from "fs";
import { join } from "path";

function renameToLowercase(dir) {
	const files = readdirSync(dir);

	for (const file of files) {
		const oldPath = join(dir, file);
		const newPath = join(dir, file.toLowerCase());

		renameSync(oldPath, newPath);

		if (statSync(newPath).isDirectory()) {
			renameToLowercase(newPath);
		}
	}
}

renameToLowercase(".");
