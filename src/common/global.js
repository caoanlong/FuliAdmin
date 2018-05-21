export default function install(Vue) {
	// 图片地址
	Vue.prototype.imgUrl = process.env.IMG_API
	Vue.prototype.imgUrlMini = process.env.IMG_API + '/image/uploads_mini'
	// 图片api地址
	Vue.prototype.baseImgApi = process.env.BASE_API.split('/api')[0]
}