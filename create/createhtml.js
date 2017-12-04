/**
 * Created by Tesla on 2017/12/4/0004.
 */

var fs = require('fs'),
	fn = require('./fn'),
	setting = require('./setting'),
	template = fs.readFileSync(setting.templatePath, 'utf8');

console.log(setting);
console.log(template);

function createAll(){
	setting.pages.forEach(function (item) {
		console.log(item);
		var html = fn.solve(template, {fileName: item}),
			jsImport = getJsInit(item),
			scss = getScssInit(item);
		createHtml(item, html);
		createJs(item, jsImport);
		createScss(item, scss);
	});
}


function createHtml(filename, data){
	var file = setting.pagesPath + filename + '.html';
	createFile(file, data);
}

function createJs(filename, data){
	var file = setting.jsPath + filename + '.js';
	createFile(file, data);
}

function createScss(filename, data){
	var file = setting.scssPath + filename + '.scss';
	createFile(file, data);
}

function createFile(filename, data){
	fs.writeFileSync(filename, data, 'utf8');
	console.log(filename + ' has been create success!');
}

function getScssInit(filename) {
	var length = filename.length,
		spaceNum = Math.floor((54 - length) / 2),
		space = '', equal = '', equalNum = 54;
	if(spaceNum <= 0){
		spaceNum = 2;
		equalNum = length + 2;
	}
	while (spaceNum--){
		space += ' ';
	}
	while (equalNum--){
		equal += '=';
	}
	return '@charset "utf-8";\n\n/*' + equal + '\n' + space + filename + space + '\n' + equal + '*/\n\n.' + filename + ' {\n\n}';
}

function getJsInit(filename) {
	var str = `import \'../scss/${filename}.scss\';\n`;
	return str;
}


createAll();