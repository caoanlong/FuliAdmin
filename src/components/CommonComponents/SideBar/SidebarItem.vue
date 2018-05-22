<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="item.is_show">
			<el-menu-item 
				v-if="!item.children || item.children.length == 0" 
				:index="item.route_name" 
				:key="item.route_name" 
				:class="{'submenu-title-noDropdown':!isNest}">
				<svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
			<el-submenu v-else :index="item.route_name" :key="item.route_name">
				<template slot="title">
					<svg-icon v-if="item.icon" :icon-class="item.icon"></svg-icon>
					<span slot="title">{{item.name}}</span>
				</template>
				<template v-for="child in item.children" v-if="child.is_show">
					<el-menu-item 
						:index="child.route_name" 
						:key="child.route_name"  
						v-if="!child.children || child.children.length == 0">
						<svg-icon v-if="child.icon" :icon-class="child.icon"></svg-icon>
						<span>{{child.name}}</span>
					</el-menu-item>
					<sidebar-item v-else :is-nest="true" class="nest-menu" :routes="[child]" :key="child.route_name"></sidebar-item>
				</template>
			</el-submenu>
		</template>
	</div>
</template>

<script>
export default {
	name: 'SidebarItem',
	props: {
		routes: {
			type: Array
		},
		isNest: {
			type: Boolean,
			default: false
		}
	}
}
</script>

