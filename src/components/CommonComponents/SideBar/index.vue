<template>
	<scroll-bar>
		<el-menu mode="vertical" :default-active="$route.name" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" @select="selectIndex">
			<el-menu-item index="home" class="submenu-title-noDropdown">
				<svg-icon icon-class="home-icon"></svg-icon>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="imagemanage" class="submenu-title-noDropdown">
				<svg-icon icon-class="images-icon"></svg-icon>
				<span slot="title">图片管理</span>
			</el-menu-item>
			<el-menu-item index="membermanage" class="submenu-title-noDropdown">
				<svg-icon icon-class="members-icon"></svg-icon>
				<span slot="title">会员管理</span>
			</el-menu-item>
			<el-menu-item index="usermanage" class="submenu-title-noDropdown">
				<svg-icon icon-class="users-icon"></svg-icon>
				<span slot="title">用户管理</span>
			</el-menu-item>
		</el-menu>
	</scroll-bar>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import ScrollBar from '../ScrollBar'
export default {
	name: 'sideBar',
	computed: {
		...mapGetters([
			'sidebar'
		]),
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	methods: {
		selectIndex(index) {
			this.$router.push({ name: index })
		}
	},
	components: {
		ScrollBar
	}
}

</script>
<style lang="stylus" scoped>
</style>