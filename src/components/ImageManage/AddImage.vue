<template>
	<div class="main-content">
		<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>添加图片</span>
		</div>
		<el-row>
			<el-col :span="14" :offset="5">
				<el-form label-width="120px">
					<el-form-item label="图片分类">
						<el-select style="width: 100%" placeholder="请选择" value="">
							<el-option label="丝袜" value="丝袜"></el-option>
							<el-option label="模特" value="模特"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图片分级">
						<el-select style="width: 100%" placeholder="请选择" value="">
							<el-option label="1" value="1"></el-option>
							<el-option label="2" value="2"></el-option>
							<el-option label="3" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="图片名称">
						<el-input auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="图片封面">
						<el-input auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="图片列表">
						<el-input auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio-group v-model="form.resource">
							<el-radio label="下线"></el-radio>
							<el-radio label="上线"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="addUser">立即创建</el-button>
						<el-button @click.native="back">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</el-card>
	</div>
</template>
<script type="text/javascript">
export default {
	name: 'addimage',
	data() {
      return {
        form: {
          resource: ''
        }
      }
    }
}

</script>
<style lang="stylus">


</style>
