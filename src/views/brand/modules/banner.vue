<template>
	<div class="banner-view limit-max-width">
		<div class="banner-title">
			<div>
				<p class="h-2">健康有机菜 就要原生态</p>
				<p class="h-1">农超企品牌馆</p>
				<ul class="h-3">
					<li>粮油</li>
					<li>蔬菜</li>
					<li>花卉</li>
					<li>药材</li>
					<li>水产</li>
				</ul>
			</div>
		</div>
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
	height: 400px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-image: url(../../../assets/imgs/brand/brand-bg.png);
	.banner-title {
		color: #248351;
		height: 100%;
		display: grid;
		align-items: center;
		animation: startopacity 1s;
		@keyframes startopacity {
			from {
				opacity: 0;
				margin-top: -10px;
			}
			to {
				opacity: 1;
			}
		}
		.h-1 {
			font-size: 70px;
		}
		.h-2 {
			font-size: 28px;
		}
		.h-3 {
			display: flex;
			margin-top: 30px;
			li {
				margin-right: 40px;
				list-style: disc;
				list-style-position: inside;
			}
		}
	}
}
</style>
