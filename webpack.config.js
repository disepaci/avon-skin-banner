const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const srcDir=path.join(__dirname,'js')
const destDir=path.join(__dirname,'dist')

function asset(file){
	return path.join(srcDir,file)
}

module.exports = {
	mode: "production",
	entry: {
		master: asset('index.js'),
	},
	output: {
		filename: 'timekeeper.min.js',
		path: destDir, // www/js
		// libraryTarget: 'system'
	},
	//devtool:'source-map',
	plugins: [
    	new CleanWebpackPlugin(),
	]
};
