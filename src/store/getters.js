const getters = {
	token: state => state.user.token,
	avatar: state => state.user.avatar,
	name: state => state.user.name,
	sidebar: state => state.app.sidebar,
	menus: state => state.menu.menus
}
export default getters