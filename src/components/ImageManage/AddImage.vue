<template>
	<div class="main-content">
		<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>添加图片</span>
		</div>
		<el-row>
			<el-col :span="14" :offset="5">
				<el-form label-width="120px">
					<el-form-item label="级别">
						<el-select style="width: 100%" placeholder="请选择" v-model="image.level_id">
							<el-option v-for="level in levels" :key="level.dict_id" :label="level.value" :value="level.dict_id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="名称">
						<el-input v-model="image.name"></el-input>
					</el-form-item>
					<el-form-item label="描述">
						<el-input type="textarea" v-model="image.description"></el-input>
					</el-form-item>
					<el-form-item label="是否显示">
						<el-switch v-model="image.is_show"></el-switch>
					</el-form-item>
					<el-form-item label="封面">
						<ImageUpload 
							:files="[image.thumbnail]" 
							@imgUrlBack="handleThumbnailSuccess" 
							:isUseCropper="false">
						</ImageUpload>
					</el-form-item>
					<el-form-item label="图片列表">
						<ImageUpload 
							:files="image.content" 
							@imgUrlBack="handleContentSuccess" 
							:isUseCropper="false" 
							:limitNum="100">
						</ImageUpload>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="save">立即创建</el-button>
						<el-button @click="back">取消</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</el-card>
	</div>
</template>
<script type="text/javascript">
import request from '../../common/request'
import { Message } from 'element-ui'
import ImageUpload from '../CommonComponents/ImageUpload'
export default {
	name: 'addimage',
	data() {
		return {
			levels: [],
			image: {
				name: '',
				thumbnail: '',
				description: '',
				level_id: '',
				content: [],
				is_show: true,
			}
		}
	},
	created() {
		this.getLevels()
	},
	methods: {
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
		save() {
			let data = {
				name: this.image.name,
				thumbnail: this.image.thumbnail,
				description: this.image.description,
				level_id: this.image.level_id,
				content: this.image.content.join(','),
				is_show: this.image.is_show
			}
			request({
				url: '/image/add',
				method: 'post',
				data
			}).then(res => {
				Message.success(res.data.msg)
				this.$router.push({name: 'imagemanage'})
			}).catch(err => {})
		},
		handleThumbnailSuccess(res) {
			this.image.thumbnail = res[0]
		},
		handleContentSuccess(res) {
			this.image.content = res
		},
		back() {
			this.$router.go(-1)
		}
	},
	components: {
		ImageUpload
	}
}
</script>
<style lang="stylus">

</style>
