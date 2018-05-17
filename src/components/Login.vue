<template>
	<div class="login-container">
		<el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
			<div class="title-container">
				<h3 class="title">福利后台管理系统</h3>
			</div>
			<el-form-item prop="mobile">
				<span class="svg-container svg-container_login">
					<svg-icon icon-class="user"/>
				</span>
				<el-input name="mobile" type="text" v-model="loginForm.mobile" placeholder="请输入手机号" />
			</el-form-item>
			<el-form-item prop="password">
				<span class="svg-container">
					<svg-icon icon-class="password"/>
				</span>
				<el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" placeholder="请输入密码" />
				<span class="show-pwd" @click="showPwd">
					<svg-icon icon-class="eye"/>
				</span>
			</el-form-item>
			<el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
		</el-form>
	</div>
</template>
<script type="text/javascript">
	import { checkMobile } from '../common/validator'
	export default {
		data () {
			return {
				loginForm: {
					mobile: '',
					password: ''
				},
				loginRules: {
					mobile: [
						{ required: true, message: '手机号不能为空' },
						{ validator: checkMobile }
					],
					password: [
						{ required: true, message: '密码不能为空' },
						{ min: 5, max: 20, message: '长度在 5 到 20 个字符' }
					]
				},
				passwordType: 'password',
				loading: false
			}
		},
		methods: {
			showPwd() {
				if (this.passwordType === 'password') {
					this.passwordType = ''
				} else {
					this.passwordType = 'password'
				}
			},
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (valid) {
						this.loading = true
						this.$store.dispatch('Login', this.loginForm).then(() => {
							this.loading = false
							this.$router.push({ path: '/' })
						}).catch((err) => {
							console.log(err)
							this.loading = false
						})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
		}
	}
</script>
<style lang="stylus">
	.login-container
		.el-input
			display inline-block
			height 47px
			width 85%
			input
				background transparent
				border 0px
				-webkit-appearance none
				border-radius 0px
				padding 12px 5px 12px 15px
				color #eee
				height 47px
				&:-webkit-autofill
					-webkit-box-shadow 0 0 0px 1000px #2d3a4b inset !important
					-webkit-text-fill-color #fff !important
		.el-form-item
			border 1px solid rgba(255, 255, 255, 0.1)
			background rgba(0, 0, 0, 0.1)
			border-radius 5px
			color #454545
</style>
<style lang="stylus" scoped>
	.login-container
		height 100vh
		background-color #2d3a4b
		.login-form
			position absolute
			left 0
			right 0
			width 520px
			padding 35px 35px 15px 35px
			margin 120px auto
			.svg-container
				padding 6px 5px 6px 15px
				color #889aa4
				vertical-align middle
				width 30px
				display inline-block
				.svg-container_login
					font-size 20px
			.title-container
				position relative
				.title
					font-size 26px
					font-weight 400
					color #eee
					margin 0px auto 40px auto
					text-align center
					font-weight bold
			.show-pwd
				position absolute
				right 10px
				top 7px
				font-size 16px
				color #889aa4
				cursor pointer
				user-select none
</style>