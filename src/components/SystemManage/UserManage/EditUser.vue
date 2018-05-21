<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑用户</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="头像">
							<ImageUpload :files="[user.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" />
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="user.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="手机号码">
							<el-input auto-complete="off" v-model="user.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="密码">
							<el-input auto-complete="off" v-model="user.password"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="是否禁用">
							<el-switch v-model="user.is_disabled"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="角色权限">
							<el-select style="width: 100%" v-model="user.role_id" placeholder="请选择">
								<el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.role_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			user: {
				name: '',
				mobile: '',
				password: '',
				is_disabled: '',
				role_id: '',
			},
			roles: []
		}
	},
	created() {
		this.getInfo()
		this.getRoleList()
	},
	methods: {
		getInfo() {
			let params = {
				user_id: this.$route.query.user_id
			}
			request({
				url: '/sys_user/info',
				method: 'get',
				params
			}).then(res => {
				this.user = res.data.data
			}).catch(err => {})
		},
		getRoleList() {
			let params = {
				pageSize: 100
			}
			request({
				url: '/sys_role/list',
				method: 'get',
				params
			}).then(res => {
				let Oroles = res.data.data.rows
				this.roles = Oroles.map(item => {
					return {
						role_id: item.role_id,
						name: item.name
					}
				})
			}).catch(err => {})
		},
		handleAvatarSuccess(res) {
			this.user.avatar = res[0]
		},
		save() {
			let data = this.user
			request({
				url: '/sys_user/update',
				method: 'post',
				data
			}).then(res => {
				Message.success(res.data.msg)
				this.$router.push({ name: 'usermanage' })
			}).catch(err => {})
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload
	}
}

</script>
<style lang="stylus">


</style>
