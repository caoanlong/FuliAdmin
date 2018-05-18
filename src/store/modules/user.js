import { login, getUser, logout } from '../../api/login'
const user = {
	state: {
		name: '',
		token: localStorage.getItem('token'),
		avatar: ''
	},
	mutations: {
		SET_NAME: (state, name) => {
			state.name = name
			localStorage.setItem('name', name)
		},
		SET_TOKEN: (state, token) => {
			state.token = token
			localStorage.setItem('token', token)
		},
		SET_AVATAR: (state, avatar) => {
			state.avatar = avatar
			localStorage.setItem('avatar', avatar)
		}
	},
	actions: {
		login ({ commit }, userInfo) {
			const mobile = userInfo.mobile.trim()
			const password = userInfo.password
			return new Promise((resolve, reject) => {
				login(mobile, password).then(response => {
					const token = response.headers['x-access-token']
					commit('SET_TOKEN', token)
					resolve(response)
				}).catch(error => {
					reject(error)
				})
			})
		},
		logOut({ commit, state }) {
			return new Promise((resolve, reject) => {
				logout().then(() => {
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
		getUserInfo({ commit } ) {
			return new Promise((resolve, reject) => {
				getUser().then(response => {
					const data = response.data.data
					commit('SET_NAME', data.name)
					commit('SET_AVATAR', data.avatar)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}
}

export default user