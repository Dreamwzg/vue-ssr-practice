var path = require('path')
var webpack = require('webpack')
const vueServerRener = require('vue-server-renderer/server-plugin');
const ExtraPlugin = require('extract-text-webpack-plugin');


module.exports = {
  target:'node',
  entry: path.join(__dirname,'/src/server-entry.js'),
  output: {
    path: path.resolve(__dirname, './sever-bundle'),
    libraryTarget:'commonjs2',
    filename: 'server-enty.js'

  },
  externals:Object.keys(require('./package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.css$/,
        use:ExtraPlugin.extract({
          // fallback:'vue-style-loader',
          use:[
            'css-loader'
          ]
        })
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins:[
    new ExtraPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV) || '"development"',
      'process.env.VUE_ENV':'"server"'
    }),
    new vueServerRener()//该插件会使得打包的输出不再是一个js文件，而是用于服务端渲染的json文件（此时会忽略output中的filename）
      
  ],
  devtool: 'source-map'
}

