import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
	// start progress bar
	NProgress.start()
	// determine if there has token
	if (localStorage.getItem('token')) {
		/* has token*/
		if (to.path === '/login') {
			next({ path: '/' })
			NProgress.done()
		} else {
			next()
		}
	} else {
		/* has no token*/
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
		NProgress.done()
	}
})
router.afterEach(() => {
	NProgress.done() // finish progress bar
})
