<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App',
	created() {
		if (localStorage.getItem('token')) {
			this.$store.dispatch('GetUserInfo')
			// this.$store.dispatch('getMenu')
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>
