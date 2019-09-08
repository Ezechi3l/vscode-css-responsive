module.exports = class Process {

	constructor(config) {
		this.config = config;
		this.regex = /\d+(px)?\/\d+(px)?$/;
		this.setDto();
	}

	setDto(insertText = null, result = null, resultText = null) {
		this.dto = {
			insertText: insertText,
			result: result,
			resultText: resultText
		};
	}

	run(line, language) {
		//Reset the dto
		this.setDto();

		if (this.regex.test(line)) {
			var insertText = this.regex.exec(line).shift();
			var expr = insertText.replace(/px/g, "");
			var percent = eval(expr) * 100;

			if (Number.isNaN(percent) || percent === Infinity) {
				return this.dto;
			}

			if (!Number.isInteger(percent)) {
				percent = Number(
					Number.parseFloat(percent.toString()).toPrecision(7)
				);
			}

			this.setDto(
				insertText,
				percent,
				`${percent.toString()}%${language !== 'sass' ? ';' : ''} /* ${insertText} */`
			);
		}

		return this.dto;
	}
}
