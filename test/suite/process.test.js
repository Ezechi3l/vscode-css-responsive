const assert = require('assert');
const { before } = require('mocha');
const Process = require('../../process');

const vscode = require('vscode');

suite('Process Test Suite', () => {
	before(() => {
		vscode.window.showInformationMessage('Start process tests.');
	});

	const process = new Process({});
	test('It works', () => {
		assert.equal(
			'20',
			process.run('width: 20/100', 'css').result,
			"'20/100' should return 20, '" + process.run('width: 20/100', 'css').result + "' returned"
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
			'6.521739',
			process.run('	   width: 15/230', 'css').result,
			"'15/230' should return 6.521739, '" + process.run('15/230', 'css').result + "' returned"
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
});