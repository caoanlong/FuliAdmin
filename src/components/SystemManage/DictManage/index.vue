<template>
	<div class="main-content">
		<div class="fl-card box-card">
			<div class="header clearfix">字典列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="类型">
						<el-select placeholder="请选择" value="">
							<el-option label="启用" value="启用"></el-option>
							<el-option label="禁用" value="禁用"></el-option>	
						</el-select>
					</el-form-item>
					<el-form-item label="描述">
						<el-input placeholder="描述"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getDict()">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="table">
				<el-table :data="dicts" border style="width: 100%" size="mini">
					<el-table-column label="Id" type="selection" align="center" width="40"></el-table-column>
					<el-table-column label="键值" prop="demo"></el-table-column>
					<el-table-column label="标签" prop="demo"></el-table-column>
					<el-table-column label="类型" prop="demo"></el-table-column>
					<el-table-column label="描述" prop="demo"></el-table-column>
					<el-table-column label="排序" prop="sort" align="center" width="60"></el-table-column>
					<el-table-column width="80" align="center" fixed="right">
						<template slot-scope="scope">
							<el-dropdown  @command="handleCommand"  trigger="click">
								<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item :command="{type: 'view', id:scope.row.dictID}">查看</el-dropdown-item>
									<el-dropdown-item :command="{type: 'edit', id: scope.row.dictID}">编辑</el-dropdown-item>
									<el-dropdown-item :command="{type: 'delete', id: scope.row.dictID}" >删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</template>
					</el-table-column>
				</el-table>
				<el-row type="flex">
					<el-col :span="12" style="padding-top: 15px; font-size: 12px; color: #909399">
						<span>总共 {{count}} 条记录每页显示</span>
						<el-select size="mini" style="width: 90px; padding: 0 5px" v-model="pageSize" @change="getDict()">
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
	</div>
</template>
<script type="text/javascript">

import { Message } from 'element-ui'
export default {
	data() {
		return {
			count:33,
			pageIndex: 1,
			pageSize: 10,
			dicts:[{
				dictID:1,
				demo:11111,
				sort:1
			}
			]
		}
	},
	created() {
		
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
		},
		getDict(){},
		add(){},
		reset(){},
		handleCommand(e) {
			if(e.type=='view'){
				this.$router.push({name: 'viewdict', query: { dictID:e.id }})
			}else if(e.type=='edit'){
				this.$router.push({ name: 'editdict' , query: {  dictID:e.id } })
			}else if(e.type=='delete'){
				this.deleteConfirm(e.id)
			}
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [].concat(id)
			} else {
				if (this.selectedDicts.length == 0) {
					this.$message({
						type: 'warning',
						message: '请选择'
					})
					return
				}
				ids = this.selectedDicts
			}
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.delDict(ids)
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
		delDict(ids) {
			let data = {
				ids: ids
			}
			request({
				url: '/sys_dict/delete',
				method: 'post',
				data
			}).then(res => {
				if (res.data.code == 0) {
					this.getDict()
				} else {
					Message.error(res.data.msg)
				}
			})
		},
		
	},
	components: {
		
	}
}

</script>
<style lang="stylus" scoped>
.download-btn
	font-size 12px
	color #606266
	height 29px
	line-height 29px
	padding 0 15px
	border 1px solid #dcdfe6
	border-radius 3px
	background #fff
	margin 0 10px
	display inline-block
	&:hover
		border-color #c6e2ff
		color #409eff
		background #ecf5ff
	&:active
		border-color #3a8ee6
		color #3a8ee6
</style>
