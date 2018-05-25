<template>
	<div class="main-content">
		<el-card class="box-card">
			<div slot="header">会员列表</div>
			<div class="search">
				<el-form :inline="true" class="demo-form-inline" size="small">
					<el-form-item label="手机号码">
						<el-input placeholder="请输入..." v-model="findMobile"></el-input>
					</el-form-item>
					<el-form-item label="名字">
						<el-input placeholder="请输入..." v-model="findName"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="getList">查询</el-button>
						<el-button type="default" @click="reset">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="F-table">
				<el-table :data="members" border style="width: 100%" size="small">
					<el-table-column type="selection" width="40" align="center">
					</el-table-column>
					<el-table-column prop="mobile" label="手机号码" align="center" width="100"></el-table-column>
					<el-table-column prop="name" label="名字" align="center"></el-table-column>
					<el-table-column prop="glamour" label="魅力值" align="center"></el-table-column>
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
					<el-table-column prop="is_disabled" label="状态" align="center" width="60">
						<template slot-scope="scope">
							<el-tag size="mini" type="info" v-if="scope.row.is_disabled">禁用</el-tag>
							<el-tag size="mini" type="success" v-else>正常</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作" align="center" width="210">
						<template slot-scope="scope">
							<el-button size="mini" @click="view(scope.row.member_id)">查看</el-button>
							<el-button size="mini" @click="disable(scope.row.member_id, false)" v-if="scope.row.is_disabled">启用</el-button>
							<el-button size="mini" @click="disable(scope.row.member_id, true)" v-else>禁用</el-button>
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
			findName: ''
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
			this.getList()
		},
		getList() {
			let params = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				mobile: this.findMobile,
				name: this.findName
			}
			request({
				url: '/member/list',
				method: 'get',
				params
			}).then(res => {
				this.count = res.data.data.count
				this.members = res.data.data.rows
			})
		},
		disable(member_id, is_disabled) {
			let data = {
				member_id,
				is_disabled
			}
			request({
				url: '/member/disable',
				method: 'post',
				data
			}).then(res => {
				Message.success(res.data.msg)
				this.getList()
			})
		},
		view(member_id) {
			this.$router.push({ name: 'viewmember', query: { member_id } })
		}
	}
}

</script>
<style lang="stylus">


</style>
