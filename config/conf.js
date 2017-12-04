/**
 * Created by Tesla on 2017/12/4/0004.
 */

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);

var fs = require('fs'),
	path = require('path'),
	setting = require('./setting'),
	HtmlWebpackPlugin = require('html-webpack-plugin');

var root = path.resolve(__dirname, '../'),
	src = path.resolve(root, './src'),
	dist = path.resolve(root, './dist');

function getDir(dir){
	return path.resolve(src, dir);
}

function getEntries(){
	var path = getPath(setting.entryDir),
		files = fs.readdirSync(path),
		entries = {};
	files.forEach(function(item){
		entries[item.replace(/\.js$/, '')] = path + item;
	});
	return entries;
}

function getHtmlWebpackPlugins(options){
	options = options || {};
	var path = getPath(setting.pagesDir),
		files = fs.readdirSync(path),
		htmlWebpackPlugins = [];
	files.forEach(function(item){
		var fileName = item.replace(/\.html$/, ''),
			page = new HtmlWebpackPlugin({
				filename: item,
				template: path + item,
				hash: true,
				inject: 'body',
				minify: {
					removeComments: false,
					collapseWhitespace: false,
					removeAttributeQuotes: false
				},
				chunks: ['common'].concat(options[fileName] || [], fileName),
			});
		htmlWebpackPlugins.push(page);
	});
	return htmlWebpackPlugins;
}

function getRules(){
	return [
		// {
		// 	include: getDir(setting.entryDir),
		// 	test: /\.jsx?$/,
		// 	use: {
		// 		loader: 'babel-loader',
		// 		options: {
		// 			cacheDirectory: true
		// 		}
		// 	}
		// },
		{
			include: getDir('./images/'),
			test: /\.(png|jpg|gif|svg)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 1,
						name: 'images/[name].[ext]'
					}
				}
			]
		},
		{
			include: getDir('./fonts/'),
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [
				{
					loader: 'url-loader',
					options:
						{
							limit: 1,
							mimetype: 'application/font-woff',
							name: 'fonts/[name].[ext]'
						}
				}
			]
		},
		{
			include: getDir('./fonts/'),
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: [
				{
					loader: 'file-loader',
					options:
						{
							limit: 1,
							mimetype: 'application/font-woff',
							name: 'fonts/[name].[ext]'
						}
				}
			]
		},
	]
}

function getPath(dir){
    return dir.replace(/\/*$/, '/');
}


module.exports = {
	getEntries: getEntries,
	getHtmlWebpackPlugins: getHtmlWebpackPlugins,
	getRules: getRules
};



