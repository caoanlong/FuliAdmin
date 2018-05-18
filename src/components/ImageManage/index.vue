<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">图片列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="图片分类">
						<el-select placeholder="请选择" v-model="findImgSort">
						</el-select>
					</el-form-item>
					<el-form-item label="图片分级">
						<el-select placeholder="请选择" v-model="findImgLev">
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addImage">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
			</div>
			<div class="F-table">
				<el-table :data="imgList" @selection-change="selectionChange" border style="width: 100%" size="small" stripe>
					<el-table-column type="selection" width="40" align="center">
					</el-table-column>
					<el-table-column prop="ImgSort" label="图片分类" align="center">
					</el-table-column>
					<el-table-column prop="ImgLV" label="图片分级">
					</el-table-column>
					<el-table-column prop="ImgTit" label="图片名称">
					</el-table-column>
					<el-table-column prop="ImgFace" label="图片封面">
					</el-table-column>
					<el-table-column prop="ImgList" label="图片列表">
					</el-table-column>
					<el-table-column prop="Visted" label="访问">
					</el-table-column>
					<el-table-column prop="Like" label="喜欢">
					</el-table-column>
					<el-table-column prop="Status" label="状态" align="center">
					</el-table-column>
					<el-table-column prop="UploadDate" label="上传时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="UploadOperator" label="上传操作" align="center">
					</el-table-column>
					<el-table-column prop="UnShelveDate" label="下架时间" align="center" width="140">
						<template slot-scope="scope">
							<span v-if="scope.row.create_time">{{ new Date(scope.row.create_time).getTime() | getdatefromtimestamp()}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="UnShelveOperator" label="下架操作" align="center">
					</el-table-column>
					<el-table-column prop="handle" label="操作" align="center" width="210">
						<template slot-scope="scope">
							<el-button size="mini" @click="view(scope.row._id)">查看</el-button>
							<el-button size="mini" @click="edit(scope.row._id)">编辑</el-button>
							<el-button size="mini" @click="deleteConfirm(scope.row._id)">删除</el-button>
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
	name: 'usermanage',
	data() {
		return {
			pageIndex: 1,
			pageSize: 10,
			count: 0,
			findImgSort: '',
			findImgLev: '',
			selectedList: [],
			imgList: []
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
				this.findName = '',
				this.findStatus = '',
				this.getList()
		},
		add() {
			this.$router.push({ name: 'addimg' })
		},
		edit(user_id) {
			this.$router.push({ name: 'editimg', query: { user_id } })
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
			}
			request({
				url: '/sys_user/list',
				method: 'get',
				params
			}).then(res => {
				this.count = res.data.data.count
				this.imgList = res.data.data.rows
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
