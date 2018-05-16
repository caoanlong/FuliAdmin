<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">用户列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="用户名">
						<el-input placeholder="用户名" v-model="findLoginName"></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input placeholder="姓名" findName></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input placeholder="手机号码" v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findStatus">
							<el-option label="启用" value="启用"></el-option>
							<el-option label="禁用" value="禁用"></el-option>
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
					<el-table-column prop="login_name" label="用户名">
					</el-table-column>
					<el-table-column prop="name" label="姓名">
					</el-table-column>
					<el-table-column prop="mobile" label="电话" align="center" width="100">
					</el-table-column>
					<el-table-column prop="role_id" label="角色权限" align="center">
					</el-table-column>
					<el-table-column prop="Status" label="状态" align="center" width="80">
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="create_user_id" label="创建人" align="center">
					</el-table-column>
					<el-table-column prop="update_time" label="更新时间" align="center">
						<template slot-scope="scope">
							<span v-if="scope.row.update_time">{{ new Date(scope.row.update_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="update_user_id" label="更新人" align="center">
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown @command="handleCommand" trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.user_id}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.user_id}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.user_id}">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
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
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({ name: 'viewuser', query: { user_id: e.id } })
			} else if (e.type == 'edit') {
				this.$router.push({ name: 'edituser', query: { user_id: e.id } })
			} else if (e.type == 'delete') {
				this.deleteConfirm(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'adduser' })
		},
		getUsers() {
				let params = {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					mobile: this.findMobile,
					name: this.findName,
					is_disabled:this.findStatus
				}
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
