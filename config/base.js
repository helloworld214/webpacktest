/**
 * Created by Tesla on 2017/12/4/0004.
 */


var path = require('path'),
	webpack = require('webpack'),
	conf = require('./conf');

var root = path.resolve(__dirname, '../'),
	src = path.resolve(root, './src'),
	dist = path.resolve(root, './dist');

function getDir(dir){
    return path.resolve(src, dir);
}

module.exports = {
	entry: conf.getEntries(),
	output: {
		path: dist,
		filename: './js/[name].js'
	},
	module: {
		rules: conf.getRules()
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			names: 'common',
			filename: './js/[name].js',
			minChunks: 2
		})
	].concat(conf.getHtmlWebpackPlugins())
}