export default function install(Vue) {
	// 图片地址
	Vue.prototype.imgUrl = process.env.IMG_API
	// api地址
	Vue.prototype.baseApi = process.env.BASE_API
}