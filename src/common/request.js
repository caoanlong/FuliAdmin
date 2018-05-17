import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store'

// create an axios instance
const service = axios.create({
	baseURL: process.env.BASE_API, // api的base_url
	timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
	if (localStorage.getItem('token')) {
		config.headers['X-Access-Token'] = localStorage.getItem('token')
	}
	config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
	if (config.data && config.headers['Content-Type'].includes('application/x-www-form-urlencoded')) {
    	config.data = qs.stringify(config.data)
	}
	console.log(config)
	return config
}, error => {
	// Do something with request error
	console.log(error) // for debug
	Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
	response => {
		if (response.data.code != 0) {
			if (response.data.code == 10016) {
				localStorage.clear()
				Message.error(response.data.msg)
				window.location.href = '/#/login'
				return Promise.reject('error')
			}
			Message.error(response.data.msg)
			return Promise.reject('error')
		}
		return response
	},
	error => {
		Message({
			message: error.message,
			type: 'error',
			duration: 5 * 1000
		})
		return Promise.reject(error)
	})

export default service
