const assert = require('assert');
const { before } = require('mocha');
const Process = require('../../process');

const vscode = require('vscode');

suite('Process Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start process tests.');
	});

	const process = new Process({});
	test('Regex test', () => {
		assert.equal(
			'20%', 
			process.run('width: 20/100'), 
			"'20/100' should return 20%, '" + process.run('width: 20/100') + "' returned"
		);

		assert.equal(
			'', 
			process.run('100 /20'), 
			"'100/20' should return an empty string, '" + process.run('100 /20') + "' returned"
		);
		assert.equal(
			'6.521739%',
			process.run('	   width: 15/230'),
			"'15/230' should return 6.521739%, '" + process.run('15/230') + "' returned"
		);
		assert.equal(
			'6.521739%',
			process.run('15/230'),
			"'15/230' should return 6.521739%, '" + process.run('15/230') + "' returned"
		);
		assert.equal(
			'7.5%',
			process.run('15/200'),
			"'15/200' should return 7.5%, '" + process.run('15/200') + "' returned"
		);
		assert.equal(
			'',
			process.run('width: 100'),
			"'width: 100' should return an empty string, '" + process.run('width: 100') + "' returned"
		);
		assert.equal(
			'',
			process.run('width: calc(100'),
			"'width: calc(100' should return an empty string, '" + process.run('width: calc(10 ')+ "' returned"
		);
		assert.equal(
			'',
			process.run('100/0'),
			"'100/0' should return an empty string, '" + process.run('100/0 ')+ "' returned"
		);
	});
});