
const vscode = require('vscode');
const Process = require('./process.js');

module.exports = class CSSResponsiveProvider {
	constructor(process) {
		this.process = process;
	}

	provideCompletionItems(document, position) {
		return new Promise((resolve, reject) => {

			const linePrefix = document.lineAt(position).text;
			const dto = this.process.run(linePrefix, document.languageId);

			if (null === dto.result) {
				return resolve([]);
			}

			const item = new vscode.CompletionItem(
				`${dto.insertText} => ${dto.resultText}`,
				vscode.CompletionItemKind.Snippet
			);
			// console.log('DOUCMENT', document);
			item.insertText = dto.resultText;

			item.range = new vscode.Range(
				position.line,
				position.character - (dto.insertText.length),
				position.line,
				linePrefix.length
			);

			return resolve([item]);
		});
	}
}