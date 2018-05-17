export default function install(Vue) {
	// 图片地址
	Vue.prototype.imgUrl = process.env.IMG_API
	// 图片api地址
	Vue.prototype.baseImgApi = process.env.BASE_API.split('/api')[0]
}