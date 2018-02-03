<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
				<el-form-item label="图片分类">
					<el-select placeholder="请选择" value="">
					</el-select>
				</el-form-item>
				<el-form-item label="图片分级">
					<el-select placeholder="请选择" value="">
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">查询</el-button>
					<el-button type="default">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="tableControl">
			<el-button type="default" size="mini" icon="el-icon-plus" @click.native="addImage">添加</el-button>
			<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
			<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="refresh">刷新</el-button>
		</div>
		<div class="F-table">
			<el-table :data="tableData" border style="width: 100%" size="small">
				<el-table-column type="selection" width="40" align="center">
				</el-table-column>
				<el-table-column type="index" width="40" align="center">
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
				<el-table-column prop="UploadDate" label="上传时间" align="center" width="160">
				</el-table-column>
				<el-table-column prop="UploadOperator" label="上传操作" align="center">
				</el-table-column>
				<el-table-column prop="UnShelveDate" label="下架时间" align="center"  width="160">
				</el-table-column>
				<el-table-column prop="UnShelveOperator" label="下架操作" align="center">
				</el-table-column>
				<el-table-column prop="handle" label="操作" align="center" width="210">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-view" @click="viewImage(scope.row._id)">查看</el-button>
						<el-button size="mini" icon="el-icon-edit" @click="editImage(scope.row._id)">编辑</el-button>
						<el-button size="mini" icon="el-icon-delete" @click="deleteConfirm(scope.row._id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
	name: 'usermanage',
	data() {
		return {
			tableData: [{
				"ImgSort": "丝袜",
				"ImgLV": "2",
				"ImgTit": "1231231231233",
				"ImgList": "22",
				"Visted": "57653",
				"Like": "13213",
				"Status": "下架",
				"UploadDate": "2017-12-30 20:00:04",
				"UploadOperator": "admin",
				"UnShelveDate": "2017-12-30 20:00:04",
				"UnShelveOperator": "admin"
			}, {
				"ImgSort": "模特",
				"ImgLV": "2",
				"ImgTit": "123123123",
				"ImgList": "22",
				"Visted": "45455",
				"Like": "3412",
				"Status": "下架",
				"UploadDate": "2017-12-30 20:00:04",
				"UploadOperator": "admin",
				"UnShelveDate": "2017-12-30 20:00:04",
				"UnShelveOperator": "admin"
			}]
		}
	},
	methods:{
		addImage() {
			this.$router.push({ name: 'addimage' })
		},
		viewImage() {
			// this.$router.push({ name: 'viewimage' ,query: { id: id}})
			this.$router.push({ name: 'viewimage' })
		},
		editImage() {
			// this.$router.push({ name: 'editimage' ,query: { id: id}})
			this.$router.push({ name: 'editimage' })
		}
	}
}

</script>
<style lang="stylus">


</style>
