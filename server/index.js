// nodejs 服务器
const express = require('express');
const app = express();
const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const serverBundle = require(path.resolve(__dirname, '../dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, '../dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, '../src/index.temp.html'), 'utf-8');
const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template: template,
	clientManifest: clientManifest,
});

app.use(express.static(path.resolve(__dirname, '../dist'), { index: false }));
// app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', async (req, res) => {
	try {
		const context = { url: req.url, title: 'ssr' };
		const html = await renderer.renderToString(context);
		res.send(html);
	} catch (error) {
		res.status(500).send('服务器内部错误');
	}
});

const port = 3000;
app.listen(port, function () {
	console.log(`server started at localhost:${port}`);
});
