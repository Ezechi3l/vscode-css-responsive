module.exports = class Process {

	constructor(config) {
		this.config = config;
		this.regex = /\d+\/\d+/;
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
			var insertText = this.regex.exec(line).pop()
			var percent = eval(insertText) * 100;

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
