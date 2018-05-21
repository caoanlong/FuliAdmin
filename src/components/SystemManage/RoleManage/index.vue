<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="角色名称">
					<el-input placeholder="角色名称" v-model="findName"></el-input>
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
			<el-table :data="roles"  @selection-change="selectionChange" border style="width: 100%" size="small" stripe>
				<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
				<el-table-column prop="name" label="角色名称"></el-table-column>
				<el-table-column prop="create_user.name" label="创建人" align="center"></el-table-column>
				<el-table-column prop="update_user.name" label="更新人" align="center"></el-table-column>
				<el-table-column label="创建时间" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column label="更新时间" align="center" width="140">
					<template slot-scope="scope">
						<span v-if="scope.row.update_time">{{ new Date(scope.row.update_time).getTime() | getdatefromtimestamp()}}</span>
					</template>
				</el-table-column>
				<el-table-column width="200" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="edit(scope.row.role_id)">编辑</el-button>
						<el-button type="danger" size="mini" @click="deleteConfirm(scope.row.role_id)">删除</el-button>
						<el-button type="warning" size="mini" click="setAuth(scope.row.role_id)">设置权限</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-row type="flex">
				<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
					<span>总共 {{count}} 条记录每页显示</span>
					<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getList()">
						<el-option label="10" :value="10"></el-option>
						<el-option label="20" :value="20"></el-option>
						<el-option label="30" :value="30"></el-option>
						<el-option label="40" :value="40"></el-option>
						<el-option label="50" :value="50"></el-option>
						<el-option label="100" :value="100"></el-option>
					</el-select>
					<span>条记录</span>
				</el-col>
				<el-col :span="12">
					<div class="pagination">
						<el-pagination :page-size="pageSize" align="right" background layout="prev, pager, next" :total="count" @current-change="pageChange"></el-pagination>
					</div>
				</el-col>
			</el-row>
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
			roles: [],
			pageIndex:1,
			pageSize:10,
			count:0,
			findName:''
		}
	},
	created() {
		this.getList()
	},
	methods: {
		selectionChange(data) {
			this.selectedList = data.map(item => item.role_id)
		},
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		reset(){
			this.findName='',
			this.getList()
		},
		add() {
			this.$router.push({ name: 'addrole' })
		},
		edit(role_id) {
			this.$router.push({ name: 'editrole' ,query: { role_id}})
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				name:this.findName
			}
			request({
				url: '/sys_role/list',
				method: 'get',
				params
			}).then(res => {
				if (res.data.code == 0) {
					this.count = res.data.data.count
					this.roles = res.data.data.rows
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		deleteConfirm(id) {
			let ids = ''
			if (id && typeof id == 'string') {
				ids = [id]
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
				url: '/sys_role/delete',
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
