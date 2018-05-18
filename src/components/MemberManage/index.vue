<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">会员列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="手机号码">
						<el-input placeholder="手机号码" v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-select placeholder="请选择" v-model="findStatus">
							<el-option label="正常" value="false"></el-option>
							<el-option label="禁用" value="true"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="getList">查询</el-button>
						<el-button type="default" @click.native="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
				<el-button type="default" size="mini" icon="el-icon-download" @click.native="exportExcel">导出</el-button>
			</div>
			<div class="F-table">
				<el-table :data="members" border style="width: 100%" size="small">
					<el-table-column type="selection" width="40" align="center">
					</el-table-column>
					<el-table-column prop="mobile" label="手机号码" align="center" width="100">
					</el-table-column>
					<el-table-column prop="address" label="活跃度" align="center">
					</el-table-column>
					<el-table-column prop="create_time" label="创建时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="create_time" label="最后登录时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="is_disabled" label="状态" align="center" width="60">
						<template slot-scope="scope">
							<el-tag size="mini" type="info" v-if="scope.row.is_disabled">禁用</el-tag>
							<el-tag size="mini" type="success" v-else>正常</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="address" label="操作" align="center" width="210">
						<template slot-scope="scope">
							<el-button size="mini" @click="edit(scope.row.mem_id)">编辑</el-button>
							<el-button size="mini" @click="deleteConfirm(scope.row.mem_id)">删除</el-button>
							<el-button size="mini">封停</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
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
		</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../common/request'
import { Message } from 'element-ui'
export default {
	name: 'membermanage',
	data() {
		return {
			members: [],
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			findMobile: '',
			findStatus: '',
			selectedList: [],
		}
	},
	created() {
		this.getList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		reset() {
			this.findMobile = '',
				this.findStatus = '',
				this.getList()
		},
		edit(user_id) {
			this.$router.push({ name: 'editmember', query: { mem_id } })
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				mobile: this.findMobile,
				is_disabled: this.findStatus
			}
			request({
				url: '/sys_user/list',
				method: 'get',
				params
			}).then(res => {
				this.count = res.data.data.count
				this.members = res.data.data.rows
			}).catch(err => {})
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.user_id)
			console.log(this.selectedList)
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
				this.getList()
			}).catch(err => {})
		}
	}
}

</script>
<style lang="stylus">


</style>
