<template>
	<div class="cosmos-page">
		<div class="wraper">
			
		</div>
	</div>
</template>

<script>
function setState(store) {

}

export default {
	name: 'index',
	data() {
		return {
			baseurl:'../static/img/home/',
		};
	},
	metaInfo: {
		title: 'cosmos',
		titleTemplate: '%s - WoW',
		meta: [
			{name: 'keywords', content: 'cosmos'},
			{name: 'description', content: '基于 Vue 的 PWA 解决方案'}
		]
	},
	methods: {
    go3d: function () {
     
    }
  },
	async asyncData({store, route}) {
		setState(store);
	}
};
// <!-- normal -->
</script>

<style lang="stylus" scoped>

.cosmos-page{
	.wraper{
		background: #000;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content:center;
		align-items:center;
	}
}

</style>
