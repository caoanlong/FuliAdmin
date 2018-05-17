import { login, getUserInfo, logout } from '../../api/login'
const user = {
	state: {
		name: '',
		token: localStorage.getItem('token'),
		avatar: ''
	},
	mutations: {
		SET_NAME: (state, name) => {
			state.name = name
		},
		SET_TOKEN: (state, token) => {
			state.token = token
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
		}
	},
	actions: {
		Login ({ commit }, userInfo) {
			const mobile = userInfo.mobile.trim()
			const password = userInfo.password
			return new Promise((resolve, reject) => {
				login(mobile, password).then(response => {
					const token = response.headers['x-access-token']
					commit('SET_TOKEN', token)
					localStorage.setItem('token', token)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		LogOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout(state.token).then(() => {
					commit('SET_NAME', '')
					commit('SET_AVATAR', '')
					commit('SET_TOKEN', '')
					localStorage.clear()
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetUserInfo({ commit }, token) {
			return new Promise((resolve, reject) => {
				// getUserInfo(token).then(response => {
				// 	const data = response.data
				// 	commit('SET_NAME', data.username)
				// 	commit('SET_ROLES', data.roles)
				// 	commit('SET_AVATAR', data.avatar)
				// 	resolve(data)
				// }).catch(error => {
				// 	reject(error)
				// })
			})
		}
	}
}

export default user