<template>
	<div class="banner-view limit-max-width flex">
		<p class="h-1">
			互联网赋能<span>农业</span>
		</p>
		<p class="h-2">NATIVE CERTIFICATION QUALITY ASSURANCE</p>
	</div>
</template>
<script>
export default {
	data(){return{
		
	}},
	components: {
		
	},
	mounted() {
		
	},
	methods:{
		
	}
}
</script>
<style  lang="scss" scoped="scoped">
.banner-view {
	position: relative;
	height: 500px;
	flex-direction: column;
	justify-content: center;
	background-image: url(../../../assets/imgs/supply/banner-bg.png);
	background-position: right;
	background-size: cover;
	background-repeat: no-repeat;
	.h-1 {
		font-size: 52px;
		font-weight: bold;
		span {
			color: #61D061;
		}
	}
	.h-2 {
		margin-top: 16px;
		font-size: 28px;
		&::after {
			content: "";
			display: block;
			width: 180px;
			height: 4px;
			background-color: #61D061;
			margin-top: 22px;
		}
	}
}
</style>
