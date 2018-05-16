<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">用户列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="用户名">
						<el-input placeholder="用户名"></el-input>
					</el-form-item>
					<el-form-item label="姓名">
						<el-input placeholder="姓名"></el-input>
					</el-form-item>
					<el-form-item label="手机号码">
						<el-input placeholder="手机号码"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" value="">
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
				<el-table :data="tableData" border style="width: 100%" size="small" stripe>
					<el-table-column type="index" width="40" align="center">
					</el-table-column>
					<el-table-column prop="name" label="用户名">
					</el-table-column>
					<el-table-column prop="name" label="姓名">
					</el-table-column>
					<el-table-column prop="mobile" label="电话" align="center" width="100">
					</el-table-column>
					<el-table-column prop="mobile" label="角色权限" align="center">
					</el-table-column>
					<el-table-column prop="Status" label="状态" align="center" width="80">
					</el-table-column>
					<el-table-column prop="date" label="创建时间" align="center">
					</el-table-column>
					<el-table-column prop="name" label="创建人" align="center">
					</el-table-column>
					<el-table-column prop="date" label="更新时间" align="center">
					</el-table-column>
					<el-table-column prop="name" label="更新人" align="center">
					</el-table-column>
					<el-table-column prop="date" label="最后登录时间" align="center">
					</el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown @command="handleCommand" trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.userID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.userID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.userID}">删除</el-dropdown-item>
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
export default {
	name: 'usermanage',
	data() {
		return {
			tableData: [{
				userID: '65432132131',
				date: '2016-05-02',
				name: '王小虎',
				mobile: '13800138001',
				Status: '封停'
			}, {
				userID: '65432132131',
				date: '2016-05-04',
				name: '王小虎',
				mobile: '13800138002',
				Status: '启用'
			}, {
				userID: '65432132131',
				date: '2016-05-01',
				name: '王小虎',
				mobile: '13800138003',
				Status: '封停'
			}, {
				userID: '65432132131',
				date: '2016-05-03',
				name: '王小虎',
				mobile: '13800138004',
				Status: '启用'
			}]
		}
	},
	methods: {
		handleCommand(e) {
			if (e.type == 'view') {
				this.$router.push({ name: 'viewuser', query: { userID: e.id } })
			} else if (e.type == 'edit') {
				this.$router.push({ name: 'edituser', query: { userID: e.id } })
			} else if (e.type == 'delete') {
				this.deleteConfirm(e.id)
			}
		},
		add() {
			this.$router.push({ name: 'adduser' })
		}
	}
}

</script>
<style lang="stylus">


</style>
