/**
 * Created by Tesla on 2017/12/4/0004.
 */

function solve(tpl, options){
	var str = tpl, key, reg;
	for(key in options){
		if(options.hasOwnProperty(key)){
			reg = new RegExp('{{' + key + '}}', 'g');
			str = str.replace(reg, options[key]);
		}
	}
	return str;
}

module.exports = {
	solve: solve
};