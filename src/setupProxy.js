// const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/weather',
        createProxyMiddleware({
            target: 'https://api.seniverse.com/v3/weather/now.json',
            changeOrigin: true,
            pathRewrite: {
                '/weather': ''
            }
        })
    )
}