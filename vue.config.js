module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
  // outputDir: 'dist',
  // assetsDir: '',
  // indexPath: 'index.html',
  devServer: {
  	host: '0.0.0.0',
	  https: true,
  },
}

    