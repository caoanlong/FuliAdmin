<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">查看会员</div>
			<el-form label-width="120px">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="头像">
							<ImageUpload :files="[member.avatar]" @imgUrlBack="handleAvatarSuccess" :fixed="true" />
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="姓名">
							<el-input auto-complete="off" v-model="member.name"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="手机号码">
							<el-input auto-complete="off" v-model="member.mobile"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="魅力值">
							<el-input auto-complete="off" v-model="member.glamour"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="是否禁用">
							<el-switch v-model="member.is_disabled"></el-switch>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	data() {
		return {
			member: {
				name: '',
				mobile: '',
				glamour: '',
				is_disabled: '',
				avatar: ''
			},
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		getInfo() {
			let params = {
				member_id: this.$route.query.member_id
			}
			request({
				url: '/member/info',
				method: 'get',
				params
			}).then(res => {
				this.member = res.data.data
			}).catch(err => {})
		},
		handleAvatarSuccess(res) {
			this.member.avatar = res[0]
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
