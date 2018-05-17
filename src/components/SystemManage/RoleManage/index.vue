<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="角色名称">
					<el-input placeholder="角色名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="getList">查询</el-button>
					<el-button type="default" @click.native="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click.native="add">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>	
		</div>
		<div class="F-table">
			<el-table :data="roles" border style="width: 100%" size="small" stripe>
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
				<el-table-column width="110" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="default" size="mini" @click="edit(scope.row.Role_ID)">编辑</el-button>
						<el-button type="default" size="mini" @click="deleteConfirm(scope.row.Role_ID)">删除</el-button>
						<!-- <el-button type="default" size="mini" @click="setAuth(scope.row.Role_ID)">删除</el-button> -->
						<!-- <el-button type="default" size="mini" @click="setUser(scope.row.Role_ID)">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
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
			selectedList:[],
			roles: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		add() {
			this.$router.push({ name: 'addrole' })
		},
		edit(Role_ID) {
			this.$router.push({ name: 'editrole' ,query: { Role_ID}})
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize
			}
			console.log(params)
			request({
				url: '/sys_role/list',
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
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = id
			} else {
				if (this.selectedList.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedList.join(',')
			}
			console.log(ids)
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delItem(ids)
				this.$message({
					type: 'success',
					message: '删除成功!'
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				})
			})
		},
		delItem(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/sys_user/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getList()
				} else {
					Message.error(res.data.msg)
				}
			})
		}
	}
}

</script>
<style lang="stylus">


</style>
