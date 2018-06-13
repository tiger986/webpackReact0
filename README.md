## The basic use of webpack and react(Route on demand load)
#### webpack.config.js
```javascript
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	
  entry: {
  	index: './src/script/education.js',
  	//vendor: ["react", "react-dom"]
  },

  output: {
    path: __dirname + '/build',
    //filename: 'education_[hash].js'
    filename: 'education.js',
    publicPath: "/build",
    //chunkFilename: '[name].[chunkhash:5].chunk.js',
    chunkFilename: "[name].js"
  },
  
  devServer: {
    contentBase: './build',
    host: 'localhost',
    port: 9000,
    historyApiFallback: false,
    proxy: {
      '/api': {
        target: 'http://dev2.3-api.zuren8.com/',
        pathRewrite: {'^/api': ''},
        changeOrigin: true
      }
    }
  },
  
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader'
      }
    ]
  },
  
  plugins: [
  	/*new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),*/
  
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      title: '11111'
    }),
    
    new ExtractTextPlugin({
      //filename: 'education_[hash].css',
      filename: 'education.css',
      disable: false,
      allChunks: true
    }),
    
    /*new OpenBrowserPlugin({
      url: 'http://localhost:9000'
    }),*/
    
    /*new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor',
        filename: 'vendor.js'
	}),*/
  ],
  
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'react-router': 'window.ReactRouter',
    'redux': 'window.Redux',
    'react-redux': 'window.ReactRedux',
    "jquery": 'window.$'
  }
  
}
```
#### route code
```javascript
require("../style/education.scss")

import React from "react"
import ReactDOM from "react-dom"

import { Router, Route, IndexRoute, IndexRedirect, browserHistory, hashHistory } from "react-router"

import { Provider } from "react-redux"
import { store } from "./redux/store"

import layoutHome from "./components/layout/layoutHome"
import teacherHomePage from "./components/member/teacherHomePage"
import resource from "./components/resource/resource"
import teacherCourseList from "./components/teacherCourse/teacherCourseList"
import evaluateManageTea from "./components/evaluateManageTea/evaluateManageTea"
import community from "./components/community/community"
import uploadRes from "./components/resource/uploadRes"
import resDetail from "./components/resource/resDetail"

ReactDOM.render(
		<Provider store={store}>
    		<Router history={hashHistory}>
      			<Route path="/" component={layoutHome}>
        				<IndexRedirect to="/teacherHomePage"></IndexRedirect>
        				<Route path="teacherHomePage" title="教师个人主页" component={teacherHomePage}></Route>
        				<Route path="resource" title="资源列表 " component={resource}></Route>
        				<Route path="teacherCourseList" title="课程中心" component={teacherCourseList}></Route>
        				<Route path="evaluateManageTea" title="测评管理" component={evaluateManageTea}></Route>
        				<Route path="community" title="社区首页" component={community}></Route>
        				<Route path="resource/uploadRes" title="上传资源" component={uploadRes}></Route>
        				<Route path="resource/resDetail/:id" title="资源详情" component={resDetail}></Route>
      			</Route>
    		</Router>
  	</Provider>,
  	
  	document.getElementById("root")
)
