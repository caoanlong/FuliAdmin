<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">图片列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="名称">
						<el-input placeholder="请选择" v-model="findName"></el-input>
					</el-form-item>
					<el-form-item label="级别">
						<el-select placeholder="请选择" v-model="findLevel">
							<el-option v-for="level in levels" :key="level.dict_id" :label="level.value" :value="level.dict_id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="是否可见">
						<el-select placeholder="请选择" v-model="findIsShow">
							<el-option label="全部" value=""></el-option>
							<el-option label="显示" :value="true"></el-option>
							<el-option label="隐藏" :value="false"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="tableControl">
				<el-button type="default" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
				<el-button type="default" size="mini" icon="el-icon-delete" @click="deleteConfirm">批量删除</el-button>
			</div>
			<div class="F-table">
				<el-table :data="imgList" @selection-change="selectionChange" border style="width: 100%" size="small" stripe>
					<el-table-column type="selection" width="40" align="center" fixed></el-table-column>
					<el-table-column prop="name" label="名称" width="120"></el-table-column>
					<el-table-column prop="thumbnail" label="封面">
						<template slot-scope="scope">
							<img height="20" :src="imgUrlMini + scope.row.thumbnail.split('/image/uploads')[1]">
						</template>
					</el-table-column>
					<el-table-column label="级别（魅力）" width="120">
						<template slot-scope="scope">
							<span>{{ scope.row.level.value + '（' + scope.row.level.glamour + '）' }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="view" label="访问"></el-table-column>
					<el-table-column prop="like" label="喜欢"></el-table-column>
					<el-table-column prop="is_show" label="是否可见" align="center">
						<template slot-scope="scope">
							<span>{{ scope.row.is_show ? '是' : '否'}}</span>
						</template>
					</el-table-column>
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
					<el-table-column prop="handle" label="操作" align="center" width="160" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" @click="setVisible(scope.row.image_id, false)" v-if="scope.row.is_show">隐藏</el-button>
							<el-button size="mini" @click="setVisible(scope.row.image_id, true)" v-else>显示</el-button>
							<el-button size="mini" @click="edit(scope.row.image_id)">编辑</el-button>
							<el-button size="mini" @click="deleteConfirm(scope.row.image_id)">删除</el-button>
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
			findName: '',
			findLevel: '',
			findIsShow: '',
			selectedList: [],
			imgList: [],
			levels: []
		}
	},
	created() {
		this.getList()
		this.getLevels()
	},
	methods: {
		pageChange(index) {
			this.pageIndex = index
			this.getList()
		},
		reset() {
			this.findName = ''
			this.findLevel = ''
			this.findIsShow = ''
			this.getList()
		},
		add() {
			this.$router.push({ name: 'addimage' })
		},
		edit(image_id) {
			this.$router.push({ name: 'editimage', query: { image_id } })
		},
		getLevels() {
			let params = {
				type: 'imageLevel'
			}
			request({
				url: '/sys_dict/list/type',
				params
			}).then(res => {
				this.levels = res.data.data
			}).catch(err => {})
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				name: this.findName,
				level_id: this.findLevel,
				is_show: this.findIsShow
			}
			request({
				url: '/image/list',
				method: 'get',
				params
			}).then(res => {
				this.count = res.data.data.count
				this.imgList = res.data.data.rows
			}).catch(err => {})
		},
		selectionChange(data) {
			this.selectedList = data.map(item => item.image_id)
		},
		setVisible(image_id, bool) {
			let data = {
				image_id,
				is_show: bool
			}
			request({
				url: '/image/hide',
				method: 'post',
				data
			}).then(res => {
				Message.success(res.data.msg)
				this.getList()
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
				ids = this.selectedList
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
				url: '/image/delete',
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
