<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑字典</span>
			</div>
			<el-row>
				<el-col :span="14" :offset="5">
					<el-form label-width="120px" :model="dict" :rules="rules" ref="ruleForm">
						<el-form-item label="键" prop="key">
							<el-input v-model="dict.key"></el-input>
						</el-form-item>
						<el-form-item label="值" prop="value">
							<el-input v-model="dict.value"></el-input>
						</el-form-item>
						<el-form-item label="类型" prop="type">
							<el-input v-model="dict.type"></el-input>
						</el-form-item>
						<el-form-item label="描述" prop="description">
							<el-input v-model="dict.description"></el-input>
						</el-form-item>
						<el-form-item label="排序">
							<el-input-number v-model="dict.sort" :min="1"></el-input-number>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="editDict">立即保存</el-button>
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
				dict: {
					type:'',
					value:'',
					key:'',
					description:'',
					sort:''
				},
				rules: {
					key: [
						{required: true, message: '请输入键值'},
						{min: 2, max: 50, message: '长度在 1 到 50 个字符'}
					],
					value: [
						{required: true, message: '请输入标签'},
						{min: 2, max: 50, message: '长度在 2 到 50 个字符'}
					],
					type: [
						{required: true, message: '请输入类型'},
						{min: 2, max: 100, message: '长度在 2 到 100 个字符'}
					],
					description: [
						{min: 2, max: 200, message: '长度在 2 到 200 个字符'}
					]
				}
			}
		},
		created() {
			this.getDict()
		},
		methods: {
			getDict() {
				let params = {
					dict_id: this.$route.query.dict_id
				}
				request({
					url: '/sys_dict/info',
					method: 'get',
					params
				}).then(res => {
					this.dict = res.data.data
				}).catch(err => {})
			},
			editDict() {
				let data= {
					dict_id: this.dict.dict_id,
					type: this.dict.type,
					value: this.dict.value,
					key: this.dict.key,
					description: this.dict.description,
					sort: this.dict.sort
				}
				this.$refs['ruleForm'].validate(valid => {
					if (valid) {
						request({
							url: '/sys_dict/update',
							method: 'post',
							data
						}).then(res => {		
							Message.success(res.data.msg)
							this.$router.push({name: 'dictmanage'})					
						}).catch(err => {})
					}
				})
			},
			back() {
				this.$router.go(-1)
			}
		}
	}
</script>
<style lang="stylus" scoped>
.avatar-uploader
	line-height 1
	width 100px
	height 100px
	overflow hidden
	border 1px dashed #d9d9d9
	border-radius 6px
	&:hover 
		border-color #409eff
	.avatar-uploader-icon
		font-size 28px
		color #8c939d
		width 98px
		height 98px
		line-height 98px
		text-align center
	.avatar
		width 98px
		height 98px
		display block
		vertical-align top
.el-checkbox
	margin-left 0!important
	margin-right 30px
</style>