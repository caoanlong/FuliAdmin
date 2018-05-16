<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="角色名称">
					<el-input placeholder="角色名称"></el-input>
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
				<el-table-column prop="name" label="角色名称">
				</el-table-column>
				<el-table-column prop="mobile" label="权限范围" align="center">
				</el-table-column>
				<el-table-column prop="date" label="创建时间" align="center">
				</el-table-column>
				<el-table-column prop="name" label="创建人" align="center">
				</el-table-column>
				<el-table-column prop="date" label="更新时间" align="center">
				</el-table-column>
				<el-table-column prop="name" label="更新人" align="center">
				</el-table-column>
				<el-table-column prop="remark" label="备注" align="center">
				</el-table-column>
				<el-table-column width="80" align="center" fixed="right">
					<template slot-scope="scope">
						<el-dropdown  @command="handleCommand"  trigger="click">
							<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item :command="{type: 'view', id:scope.row.Role_ID}">查看</el-dropdown-item>
								<el-dropdown-item :command="{type: 'edit', id: scope.row.Role_ID}">编辑</el-dropdown-item>
								<el-dropdown-item :command="{type: 'delete', id: scope.row.Role_ID}" >删除</el-dropdown-item>
								<el-dropdown-item :command="{type: 'setAuth', id: scope.row.Role_ID}" >权限设置</el-dropdown-item>
								<el-dropdown-item :command="{type: 'setUser', id: scope.row.Role_ID}" >分配用户</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	name: 'usermanage',
	data() {
		return {
			tableData: [{
				roleID:'65432132131',
				date: '2016-05-02',
				name: '管理员',
				mobile: '13800138001',
				Status: '封停'
			}, {
				roleID:'65432132131',
				date: '2016-05-04',
				name: '编辑',
				mobile: '13800138002',
				Status: '启用'
			}]
		}
	},
	methods: {
		handleCommand(e) {
			if(e.type=='view'){
				this.$router.push({name: 'viewrole', query: { Role_ID:e.id }})
			}else if(e.type=='edit'){
				this.$router.push({ name: 'editrole' , query: {  Role_ID:e.id } })
			}else if(e.type=='setAuth'){
				// this.setAuth(e)
			}else if(e.type=='setUser'){
				// this.setUser(e)
			}else if(e.type=='delete'){
				this.deleteConfirm(e.id)
			}
		}
	}
}

</script>
<style lang="stylus">


</style>
