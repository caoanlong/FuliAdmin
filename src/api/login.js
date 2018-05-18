import request from '../common/request'

export function login(mobile, password) {
	const data = {
		mobile,
		password
	}
	return request({
		url: '/auth/login',
		method: 'post',
		data
	})
}

export function logout() {
	return new Promise((resolve, reject) => {
		resolve({code: 0})
	})
}

export function getUserInfo() {
	return request({
		url: '/auth/userInfo',
		method: 'get'
	})
}