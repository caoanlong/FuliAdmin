<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">用户列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="姓名">
						<el-input placeholder="姓名" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input placeholder="手机号码" v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findStatus" >
							<el-option label="正常" :value="false"></el-option>
							<el-option label="禁用" :value="true"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getUsers">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="add">添加</el-button>
			</div>
			<div class="F-table">
				<el-table :data="users" border style="width: 100%" size="small" stripe>
					<el-table-column type="index" width="40" align="center">
					</el-table-column>
					<el-table-column prop="name" label="姓名">
					</el-table-column>
					<el-table-column prop="mobile" label="电话" align="center" width="100">
					</el-table-column>
					<el-table-column prop="role_id" label="角色权限" align="center">
					</el-table-column>
					<el-table-column prop="is_disabled" label="状态" align="center" width="80">
						<template slot-scope="scope">
							<span>{{ scope.row.is_disabled?'禁用':'正常'}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" align="center"  width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="create_user_id" label="创建人" align="center">
					</el-table-column>
					<el-table-column prop="update_time" label="更新时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.update_time">{{ new Date(scope.row.update_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="update_user_id" label="更新人" align="center">
					</el-table-column>
					<el-table-column width="120" align="center" fixed="right">
						<template slot-scope="scope">
							<el-button type="default" size="mini" @click="edit(scope.row.user_id)">编辑</el-button>
							<el-button type="default" size="mini" @click="deleteConfirm(scope.row.user_id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import request from '../../../common/request'
import { Message } from 'element-ui'
export default {
	name: 'usermanage',
	data() {
		return {
			users: [],
			pageIndex:1,
			pageSize:10,
			count:0,
			findMobile:'',
			findName:'',
			findStatus:''
		}
	},
	created() {
		this.getUsers()
	},
	methods: {
		reset(){
			this.findMobile='',
			this.findName='',
			this.findStatus='',
			this.getUsers()
		},
		add() {
			this.$router.push({ name: 'adduser' })
		},
		edit(user_id) {
			this.$router.push({ name: 'edituser' ,query: { user_id}})
		},
		getUsers() {
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					mobile: this.findMobile,
					name: this.findName,
					is_disabled:this.findStatus
				}
				console.log(params)
				request({
					url: '/sys_user/list',
					method: 'get',
					params
				}).then(res => {
					if (res.data.code == 0) {
						this.count = res.data.data.count
						this.users = res.data.data.rows
					} else {
						Message.error(res.data.msg)
					}
				})
			},
	}
}

</script>
<style lang="stylus">


</style>
