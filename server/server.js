// nodejs 服务器
const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static(path.resolve(__dirname, './dist'), { index: false }));
app.use(express.static(path.resolve(__dirname, '../dist')));

const port = 3333;
app.listen(port, function () {
	console.log(`server started at localhost:${port}`);
});
