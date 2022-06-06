const path = require('path')
function resolveRealPath (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  productionSourceMap: false,
  lintOnSave:false,
  devServer: {
   // proxy: process.env.VUE_APP_DEV_REQUEST_DOMAIN_PREFIX,
   port: 8526,
  },
  css: {
    loaderOptions: {
		sass :{
			prependData: `@import "@/styles/variables.scss";`,
		}
    }
  },
  chainWebpack: config => {
  },
}
