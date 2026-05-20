import { fileSystem } from 'src/data';

export function searchFS(input: string) {
	const matches: { path: string; content: unknown[] }[] = [];

	const walk = (nodes: unknown[], path: string[] = []) => {
		for (const node of nodes) {
			if (!node || typeof node !== 'object' || Array.isArray(node)) {
				continue;
			}

			for (const [folderName, content] of Object.entries(node)) {
				const nextPath = [...path, folderName];

				if (input && folderName.startsWith(input)) {
					matches.push({ path: nextPath.join('/'), content: content as unknown[] });
				}

				if (Array.isArray(content)) {
					walk(content, nextPath);
				}
			}
		}
	};

	walk(fileSystem);

	return matches.length > 0 ? matches : null;
}
