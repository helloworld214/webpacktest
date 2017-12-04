/**
 * Created by Tesla on 2017/12/4/0004.
 */


var path = require('path'),
	root = path.resolve(__dirname, '../'),
	src = path.resolve(root, 'src'),
    dist = path.resolve(root, 'dist');

function getDir(dir){
	return path.resolve(src, dir);
}

module.exports = {
	entryDir: getDir('../src/js/'),
	pagesDir: getDir('../src/pages/')
};