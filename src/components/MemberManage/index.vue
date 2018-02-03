<template>
	<div class="main-content">
		<div class="search">
			<el-form :inline="true" class="demo-form-inline" size="small">
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
			<el-button type="default" size="mini" icon="el-icon-delete" @click.native="deleteConfirm">批量删除</el-button>
			<el-button type="default" size="mini" icon="el-icon-download" @click.native="exportExcel">导出</el-button>
			<el-button type="default" size="mini" icon="el-icon-refresh" @click.native="refresh">刷新</el-button>
		</div>
		<div class="F-table">
			<el-table :data="tableData" border style="width: 100%" size="small">
				<el-table-column type="selection" width="40" align="center">
				</el-table-column>
				<el-table-column type="index" width="40" align="center">
				</el-table-column>
				<el-table-column prop="mobile" label="手机号码"  align="center">
				</el-table-column>
				<el-table-column prop="address" label="活跃度">
				</el-table-column>
				<el-table-column prop="date" label="注册时间"  align="center">
				</el-table-column>
				<el-table-column prop="date" label="最后登录时间"  align="center">
				</el-table-column>
				<el-table-column prop="address" label="状态"  align="center">
				</el-table-column>
				<el-table-column prop="address" label="操作"  align="center" width="210">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-view" @click="viewUser(scope.row._id)">查看</el-button>
						<el-button size="mini" icon="el-icon-edit" @click="editUser(scope.row._id)">编辑</el-button>
						<el-button size="mini"><svg-icon iconClass="stop-icon"></svg-icon> 封停</el-button>
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
				date: '2016-05-02',
				name: '王小虎',
				mobile: '13800138001',
				address: '上海市普陀区金沙江路 1518 弄'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				mobile: '13800138002',
				address: '上海市普陀区金沙江路 1517 弄'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				mobile: '13800138003',
				address: '上海市普陀区金沙江路 1519 弄'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				mobile: '13800138004',
				address: '上海市普陀区金沙江路 1516 弄'
			}]
		}
	}
}

</script>
<style lang="stylus">


</style>
