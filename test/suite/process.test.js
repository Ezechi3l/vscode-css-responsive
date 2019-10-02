const assert = require('assert');
const { before } = require('mocha');
const Process = require('../../process');

const vscode = require('vscode');

suite('Process Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start process tests.');
	});

	//Default config
	const process = new Process({
		comments: true,
		fixedDigits: 6
	});

	const processWithoutCommentary = new Process({
		comments: false,
		fixedDigits: 3
	});

	test('It works', () => {
		assert.equal(
			'20',
			process.run('width: 20/100', 'css').result,
			"'width: 20/100' should return 20, '" + process.run('width: 20/100', 'css').result + "' returned"
		);
	});
	test('It don\'t works is there is space in the expression', () => {
		assert.equal(
			null,
			process.run('100 /20', 'css').result,
			"'100 /20' should return null, '" + process.run('100 /20', 'css').result + "' returned"
		);
	});
	test('it works in large line', () => {
		assert.equal(
			'46.296296',
			process.run('	   width: 200/432', 'css').result,
			"'	   width: 200/432, '" + process.run('	   width: 200/432', 'css').result + "' returned"
		);
	});
	test('it works with characters after', () => {
		assert.equal(
			'10',
			process.run('	   width: 10/100;;mqs', 'css').result,
			"'	   width: 10/100;;mqs' should return 10, '" + process.run('	   width: 10/100;;mqs', 'css').result + "' returned"
		);
	});
	test('it works with decimales values', () => {
		assert.equal(
			'10',
			process.run('10.0px/100.00px', 'css').result,
			"'10.0px/100.00px' should return 10, '" + process.run('10.0px/100.00px', 'css').result + "' returned"
		);
	});
	test('It returns 6 digits maximum before the coma', () => {
		assert.equal(
			'6.521739',
			process.run('15/230', 'css').result,
			"'15/230' should return 6.521739, '" + process.run('15/230', 'css').result + "' returned"
		);
	});
	test('It trims digits before comma whom are zeros ', () => {
		assert.equal(
			'7.5',
			process.run('15/200', 'css').result,
			"'15/200' should return 7.5, '" + process.run('15/200', 'css').result + "' returned"
		);
	});
	test('It doesn\'t work with number alone', () => {
		assert.equal(
			null,
			process.run('width: 100', 'css').result,
			"'width: 100' should return null, '" + process.run('width: 100', 'css').result + "' returned"
		);
	});
	test('It doesn\'t interfere with calc', () => {
		assert.equal(
			null,
			process.run('width: calc(100', 'css').result,
			"'width: calc(100' should return null, '" + process.run('width: calc(100', 'css').result + "' returned"
		);
	});
	test('It handles infinity number', () => {
		assert.equal(
			null,
			process.run('100/0', 'css').result,
			"'100/0' should return null, '" + process.run('100/0', 'css').result + "' returned"
		);
	});

	test('It adds a commentary', () => {
		assert.equal(
			'40%; /* 20/50 */',
			process.run('20/50', 'css').resultText,
			"'20/50' should return 40%; /* 20/50 */, '" + process.run('20/50', 'css').resultText + "' returned"
		);
	});
	test('It doesn\'t add coma in sass', () => {
		assert.equal(
			'40% /* 20/50 */',
			process.run('20/50', 'sass').resultText,
			"'20/50' should return 40% /* 20/50 */, '" + process.run('20/50', 'sass').resultText + "' returned"
		);
	});
	test('It works with px values', () => {
		assert.equal(
			'40%; /* 20px/50px */',
			process.run('20px/50px', 'css').resultText,
			"'20px/50px' should return 40%; /* 20px/50px */, '" + process.run('20px/50px', 'css').resultText + "' returned"
		);
	});
	test('It handles the config\'s comment parameter', () => {
		assert.equal(
			'40%;',
			processWithoutCommentary.run('20px/50px', 'css').resultText,
			"'20px/50px' should return 40%;, '" + processWithoutCommentary.run('20px/50px', 'css').resultText + "' returned"
		);
	});
	test('It handles the config\'s comment parameter in sass', () => {
		assert.equal(
			'40%',
			processWithoutCommentary.run('20px/50px', 'sass').resultText,
			"'20px/50px' should return 40%, '" + processWithoutCommentary.run('20px/50px', 'css').resultText + "' returned"
		);
	});
	test('It handles the config\'s fixedDigits parameter', () => {
		assert.equal(
			'11.765',
			processWithoutCommentary.run('40/340', 'css').result,
			"'40/340' should return 11.765, '" + processWithoutCommentary.run('40/340', 'css').result + "' returned"
		);
	});
});