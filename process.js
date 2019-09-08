module.exports = class Process {

    constructor(config) {
        this.config = config;
        this.regex = /\d+\/\d+/; 
    }

    run(line) {
        if (!this.regex.test(line)) return '';

        var percent = eval(this.regex.exec(line).pop()) * 100;

        if (Number.isNaN(percent) || percent === Infinity) return '';

        if (!Number.isInteger(percent)) {
            percent = Number(Number.parseFloat(percent).toPrecision(7));
        }

        //toString to remove trailing zeros
        //percent need to be a number in order to works
        return percent.toString() + '%';
    }
}
