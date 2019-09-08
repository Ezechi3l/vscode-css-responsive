
const vscode = require('vscode');
const Process = require('./process.js');

module.exports = class CSSResponsiveProvider {
	constructor(process) {
		this.process = process;
	}

	provideCompletionItems(document, position) {
		return new Promise((resolve, reject) => {

			const process = new Process({});
			const linePrefix = document.lineAt(position).text;
			const result = process.run(linePrefix);

			if ('' == process.run(linePrefix)) {
				return resolve([]);
			}

			const item = new vscode.CompletionItem(`${linePrefix} => ${result}`, vscode.CompletionItemKind.Snippet);
			item.insertText = result;

			return resolve([item]);
		});
	}
}