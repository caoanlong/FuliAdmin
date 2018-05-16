<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">用户详情</div>
			<el-form label-width="120px" ref="ruleForm">
				<el-row>
					<el-col :span="10" :offset="6">
						<el-form-item label="姓名">
							<p>{{user.demo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="手机号码">
							<p>{{user.demo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="用户名">
							<p>{{user.demo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="手机号码">
							<p>{{user.demo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="是否启用">
							<p>{{user.demo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item label="角色权限">
							<p>{{user.demo}}</p>
						</el-form-item>
					</el-col>
					<el-col :span="10" :offset="6">
						<el-form-item>
							<el-button @click="back">返回</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	data(){
		return{
			user:{
				demo:1111
			}
		}
	},
	methods:{
		back(){

		}
	}
}

</script>
<style lang="stylus">
.el-form-item__content
	p
		margin 0
		border 1px solid #fff
		border-bottom-color #dcdfe6
		padding 0 15px
		min-height 40px
		font-family 'sans-serif'
		line-height 40px
		color #999

</style>
