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
			process.run('width: 20/100').result,
			"'20/100' should return 20%, '" + process.run('width: 20/100').result + "' returned"
		);
		assert.equal(
			null,
			process.run('100 /20').result,
			"'100 /20' should return null, '" + process.run('100 /20').result + "' returned"
		);
		assert.equal(
			'6.521739%',
			process.run('	   width: 15/230').result,
			"'15/230' should return 6.521739%, '" + process.run('15/230').result + "' returned"
		);
		assert.equal(
			'6.521739%',
			process.run('15/230').result,
			"'15/230' should return 6.521739%, '" + process.run('15/230').result + "' returned"
		);
		assert.equal(
			'7.5%',
			process.run('15/200').result,
			"'15/200' should return 7.5%, '" + process.run('15/200').result + "' returned"
		);
		assert.equal(
			null,
			process.run('width: 100').result,
			"'width: 100' should return null, '" + process.run('width: 100').result + "' returned"
		);
		assert.equal(
			null,
			process.run('width: calc(100').result,
			"'width: calc(100' should return null, '" + process.run('width: calc(10 ').result + "' returned"
		);
		assert.equal(
			null,
			process.run('100/0').result,
			"'100/0' should return null, '" + process.run('100/0 ').result + "' returned"
		);
	});
});