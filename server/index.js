import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const rawgApiKey = process.env.RAWG_API_KEY || process.env.VITE_RAWG_API_KEY || '';

app.use(cors());

app.use(
	'/api',
	createProxyMiddleware({
					target: 'https://api.rawg.io',
			changeOrigin: true,
			selfHandleResponse: false,
			onProxyReq: (proxyReq) => {
				try {
					const url = new URL(proxyReq.path || '', 'http://dummy');
					if (rawgApiKey && !url.searchParams.has('key')) {
						url.searchParams.set('key', rawgApiKey);
						proxyReq.path = url.pathname + url.search;
					}
				} catch {}
			},
})
);

const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
	res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
	console.log(`Server listening on http://localhost:${port}`);
});