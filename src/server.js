// server.js
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.server'); // 替换成您的Webpack配置文件路径
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App'); // 替换成您的React应用的入口文件

const compiler = webpack(webpackConfig);

const app = express();

app.use(webpackDevMiddleware(compiler, {
  serverSideRender: true, // 重要：启用服务器端渲染
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static('build')); // 替换成您的项目打包后的静态文件夹

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
