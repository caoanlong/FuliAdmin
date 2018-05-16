'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	ENV_CONFIG: '"dev"',
	BASE_API: '"http://192.168.1.16:4000/api"',  // 测试
	IMG_API: '"http://47.106.171.37:3030"',
})
