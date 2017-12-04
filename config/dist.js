/**
 * Created by Tesla on 2017/12/4/0004.
 */


var path = require('path'),
	base = require('./base'),
	webpack = require('webpack'),
	merge = require('webpack-merge'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

var root = path.resolve(__dirname, '../'),
	src = path.resolve(root, 'src'),
    dist = path.resolve(root, 'dist');

function getDir(dir){
	return path.resolve(src, dir);
}

module.exports = merge(base, {
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [{
					loader:'html-loader',
					options:{
						minimize: false,
						htmlLoader: {
							ignoreCustomFragments: [/\{\{.*?\}\}/],
							root: getDir('./images/'),
							attrs: ['img:src']
						}
					}
				}],
				exclude: /node_modules/
			},
			{
				include: [getDir('./scss'), getDir('./sass'), getDir('./css')],
				test: /\.(sass|scss|css)$/,
				use: ExtractTextPlugin.extract(
					{
						fallback: 'style-loader',
						use: [
							'css-loader',
							"sass-loader"
						]
					}
				)
			},
		],
	},
	devtool: 'source-map',
	plugins: [
		// 每次打包前，先清空原来目录中的内容
		new CleanWebpackPlugin(dist,{verbose: true, root: root}),

		// 官方文档推荐使用下面的插件确保 NODE_ENV
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),

		// 抽取公共CSS 文件
		new ExtractTextPlugin({
			filename: function(getPath){
				var n = getPath('css/[name].css'),
					com = getPath('css/[name].css').match(/\/\w+?\./ig);
				console.log(n);
				console.log(com);
				return getPath('css/[name].css').replace('css/js', 'css');
			},
			allChunks: true,
			ignoreOrder: true
		}),
		//压缩代码
		new ParallelUglifyPlugin({
			cacheDir: getDir('./cache'),
			uglifyJS:{
				output: {
					comments: false
				},
				compress: {
					warnings: false,
					drop_debugger: true,
					drop_console: true
				}
			}
		}),
		//启用css代码压缩
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]
});