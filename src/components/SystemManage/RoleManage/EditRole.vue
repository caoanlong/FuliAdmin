<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">编辑角色</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px">
						<el-form-item label="角色名称">
							<el-input auto-complete="off" v-model="role.name"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="save">保存</el-button>
							<el-button @click="back">取消</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import { Message } from 'element-ui'
export default {
	data() {
		return {
			role: {},
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				role_id: this.$route.query.role_id
			}
			request({
				url: '/sys_role/info',
				method: 'get',
				params
			}).then(res => {
				this.role = res.data.data
			}).catch(err => {})
		},
		save() {
			let data = this.role
			request({
				url: '/sys_role/update',
				method: 'post',
				data
			}).then(res => {
				Message.success(res.data.msg)
				this.$router.push({ name: 'rolemanage' })
			}).catch(err => {})
		},
		back() {
			this.$router.go(-1)
		}
	}
}

</script>
<style lang="stylus" scoped>


</style>
