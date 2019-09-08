
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
			const dto = process.run(linePrefix);

			if (null === dto.result) {
				return resolve([]);
			}

			const item = new vscode.CompletionItem(
				`${dto.insertText} => ${dto.result}`,
				vscode.CompletionItemKind.Snippet
			);

			item.insertText = dto.result;

			return resolve([item]);
		});
	}
}