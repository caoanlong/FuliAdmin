<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">添加用户</div>
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
							<el-select style="width: 100%" v-model="user.role_id" placeholder="请选择">
								<el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.role_id">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item>
							<el-button type="primary" @click="addUser">立即添加</el-button>
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
			user: {
				mobile:'',
				name: '',
				mobile:'',
				password:'',
				is_disabled:true,
				role_id:'',
				avatar:''
			},
			roles:[]
		}
	},
	created(){
		this.getRoleList()
	},
	methods:{
		addUser(){
			let data = this.user
			console.log(data)
			request({
				url: '/sys_user/add',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					console.log(res.data)
					Message.success(res.data.msg)
					this.$router.push({ name: 'usermanage' })
				} else {
					Message.error(res.data.msg)
				}
			})
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
				if (res.data.code == 0) {
					let Oroles = res.data.data.rows
					this.roles = Oroles.map(item => {
						return {
							role_id: item.role_id,
							name: item.name
						}
					})
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		handleAvatarSuccess(res) {
			this.user.avatar = res[0]
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
