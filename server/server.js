import express from 'express'
import {httpProxy} from 'http-proxy'

const app = express();
const proxy = httpProxy.createProxyServer({});

const proxyHost = 'your_target_api_host';  // Замените на фактический хост вашего API
const proxyPort = your_target_api_port;    // Замените на фактический порт вашего API

app.use('/', (req, res) => {
  // Проксируем запрос на ваш целевой API
  proxy.web(req, res, {
    target: `http://${proxyHost}:${proxyPort}`,
    changeOrigin: true,
  });
});

const proxyServerPort = 3000;  // Замените на желаемый порт для вашего прокси-сервера

app.listen(proxyServerPort, () => {
  console.log(`Proxy server is running on port ${proxyServerPort}`);
});