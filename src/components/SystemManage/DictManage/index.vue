<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="类型">
					<el-select placeholder="请选择" v-model="findDictType">
						<el-option 
							v-for="dictType in dictTypes" 
							:key="dictType.type" 
							:label="dictType.description +'('+ dictType.type + ')'" 
							:value="dictType.type">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="描述">
					<el-input placeholder="描述" v-model="findDescription"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getList()">查询</el-button>
					<el-button type="default" @click="reset">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
		</div>
		<div class="F-table">
			<el-table :data="dicts" @selection-change="selectionChange" border style="width: 100%" size="small" stripe>
				<el-table-column label="dict_id" type="selection" align="center" width="40"></el-table-column>
				<el-table-column label="键" prop="key"></el-table-column>
				<el-table-column label="值" prop="value"></el-table-column>
				<el-table-column label="类型" prop="type"></el-table-column>
				<el-table-column label="描述" prop="description"></el-table-column>
				<el-table-column label="排序" prop="sort" align="center" width="60"></el-table-column>
				<el-table-column width="110" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="edit(scope.row.dict_id)">编辑</el-button>
						<el-button type="danger" size="mini" @click="deleteConfirm(scope.row.dict_id)">删除</el-button>
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
	data() {
		return {
			count: 0,
			pageIndex: 1,
			pageSize: 10,
			findDictType: '',
			findDescription: '',
			dicts: [],
			dictTypes: [],
			selectedList: []
		}
	},
	created() {
		this.getList()
		this.getTypeList()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		reset() {
			this.findDictType = ''
			this.findDescription = ''
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				type: this.findDictType,
				description: this.findDescription,
			}
			request({
				url: '/sys_dict/list',
				method: 'get',
				params
			}).then(res => {
				this.count = res.data.data.count
				this.dicts = res.data.data.rows
			}).catch(err => {})
		},
		getTypeList() {
			request({
				url: '/sys_dict/type'
			}).then(res => {
				this.dictTypes = res.data.data
			}).catch(err => {})
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.dict_id)
		},
		add() {
			this.$router.push({ name: 'adddict' })
		},
		edit(dict_id) {
			this.$router.push({ name: 'editdict', query: { dict_id } })
		},
		deleteConfirm(id) {
			let ids = []
			if (id && typeof id == 'string') {
				ids = [id]
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
				this.getList()
			}).catch(err => {})
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
