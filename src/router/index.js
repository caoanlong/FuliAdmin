import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '*',
			redirect: '/404'
		},
		{
			path: '/404',
			name: '404',
			component: () => import('../components/404')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../components/Login')
		},
		{
			path: '',
			component: () => import('../components/Layout'),
			children: [
				{
					path: '/',
					name: 'home',
					meta: {
						title: '首页'
					},
					component: () => import('../components/Home')
				},
				{
					path: '/imagemanage',
					name: 'imagemanage',
					meta: {
						title: '图片管理'
					},
					component: () => import('../components/ImageManage')
				},
				{
					path: '/addimage',
					name: 'addimage',
					meta: {
						title: '添加图片'
					},
					component: () => import('../components/ImageManage/AddImage')
				},
				{
					path: '/viewimage',
					name: 'viewimage',
					meta: {
						title: '查看图片'
					},
					component: () => import('../components/ImageManage/ViewImage')
				},
				{
					path: '/editimage',
					name: 'editimage',
					meta: {
						title: '编辑图片'
					},
					component: () => import('../components/ImageManage/EditImage')
				},
				{
					path: '/membermanage',
					name: 'membermanage',
					meta: {
						title: '会员管理'
					},
					component: () => import('../components/MemberManage')
				},
				{
					path: '/usermanage',
					name: 'usermanage',
					meta: {
						title: '用户管理'
					},
					component: () => import('../components/UserManage')
				}
			]
		},
	]
})
