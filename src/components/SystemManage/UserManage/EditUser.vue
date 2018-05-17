<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">编辑用户</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="头像">
							<ImageUpload :files="[user.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true"/>
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
							<el-select style="width: 100%" multiple placeholder="请选择" value="">
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item>
							<el-button type="primary" @click="editUser">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../../CommonComponents/ImageUpload'
export default {
	data(){
		return{
			user: {}
		}
	},
	created() {
		this.getInfo()
	},
	methods:{
		getInfo(){
			let params = {
				user_id: this.$route.query.user_id
			}
			request({
				url: '/sys_user/info',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.user = res.data.data
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		handleAvatarSuccess(res) {
			this.user.avatar = res[0]
		},
		editUser(){
			let data = this.user
			request({
				url: '/sys_user/update',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					Message.success(res.data.msg)
					this.$router.push({ name: 'usermanage' })
				} else {
					Message.error(res.data.msg)
				}
			})
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
