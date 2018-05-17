'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	BASE_API: '"http://47.106.171.37:4444/api"',  // 线上
	// BASE_API: '"http://localhost:4444/api"',  // 测试
	IMG_API: '"http://47.106.171.37:3030"',
})
