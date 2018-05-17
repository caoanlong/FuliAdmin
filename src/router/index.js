import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '*',
			redirect: '/404'
		},
		{
			path: '/404',
			name: '404',
			component: () =>
				import ('../components/404')
		},
		{
			path: '/login',
			name: 'login',
			component: () =>
				import ('../components/Login')
		},
		{
			path: '',
			component: () =>
				import ('../components/Layout'),
			children: [{
					path: '/',
					name: 'home',
					meta: {
						title: '首页'
					},
					component: () =>
						import ('../components/Home')
				},
				{
					path: '/imagemanage',
					name: 'imagemanage',
					meta: {
						title: '图片管理'
					},
					component: () =>
						import ('../components/ImageManage')
				},
				{
					path: '/addimage',
					name: 'addimage',
					meta: {
						title: '添加图片'
					},
					component: () =>
						import ('../components/ImageManage/AddImage')
				},
				{
					path: '/viewimage',
					name: 'viewimage',
					meta: {
						title: '查看图片'
					},
					component: () =>
						import ('../components/ImageManage/ViewImage')
				},
				{
					path: '/editimage',
					name: 'editimage',
					meta: {
						title: '编辑图片'
					},
					component: () =>
						import ('../components/ImageManage/EditImage')
				},
				{
					path: '/membermanage',
					name: 'membermanage',
					meta: {
						title: '会员管理'
					},
					component: () =>
						import ('../components/MemberManage')
				},
				{
					path: '/systemmanage',
					name: 'systemmanage',
					meta: {
						title: '系统管理'
					},
					component: () =>
						import ('../components/SystemManage'),
					redirect: '/usermanage',
					children: [
						{
							path: '/usermanage',
							name: 'usermanage',
							meta: {
								title: '用户管理'
							},
							component: () =>
								import ('../components/SystemManage/UserManage')
						},
						{
							path: '/adduser',
							name: 'adduser',
							meta: {
								title: '添加用户'
							},
							component: () =>
								import ('../components/SystemManage/UserManage/AddUser')
						},
						{
							path: '/edituser',
							name: 'edituser',
							meta: {
								title: '编辑用户'
							},
							component: () =>
								import ('../components/SystemManage/UserManage/EditUser')
						},
						{
							path: '/rolemanage',
							name: 'rolemanage',
							meta: {
								title: '角色管理'
							},
							component: () =>
								import ('../components/SystemManage/RoleManage')
						},
						{
							path: '/addrole',
							name: 'addrole',
							meta: {
								title: '添加角色'
							},
							component: () =>
								import ('../components/SystemManage/RoleManage/AddRole')
						},
						{
							path: '/editrole',
							name: 'editrole',
							meta: {
								title: '编辑角色'
							},
							component: () =>
								import ('../components/SystemManage/RoleManage/EditRole')
						},
						{
							path: '/dictmanage',
							name: 'dictmanage',
							meta: {
								title: '字典管理'
							},
							component: () =>
								import ('../components/SystemManage/DictManage')
						},
						{
							path: '/menumanage',
							name: 'menumanage',
							meta: {
								title: '菜单管理'
							},
							component: () =>
								import ('../components/SystemManage/MenuManage')
						}
					]
				},

			]
		},
	]
})
