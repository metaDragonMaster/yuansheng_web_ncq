<template>
	<div class="brand-view">
		<Banner></Banner>
		<div class="model-title">合作<span>品牌</span></div>
		<ul class="grid-col-5 grid-cards">
			<li>
				<img src="" alt="">
			</li>
			<li>
				<img src="" alt="">
			</li>
			<li>
				<img src="" alt="">
			</li>
			<li>
				<img src="@/assets/imgs/homepage/cooperation-swiper/5.png" alt="">
			</li>
			<li>
				<img src="" alt="">
			</li>
		</ul>
		<div class="recommend-bg">
			<div class="model-title">大牌<span>推荐</span></div>
			<Recommend></Recommend>
		</div>
		<!-- <Cooperation></Cooperation> -->
	</div>
</template>
<script>
import Banner from "./modules/banner.vue";
import Recommend from './modules/recommend.vue';
export default {
	data(){return{
		
	}},
	components: {
		Banner,
		Recommend,
	},
	mounted() {
		
	},
	methods:{
		
	}
}
</script>
<style  lang="scss" scoped="scoped">
.brand-view {
	.model-title {
		font-size: 38px;
		text-align: center;
		padding: 60px 0 40px 0;
		&.left {
			text-align: left;
		}
		span {
			color: #4BC427;
		}
	}
	.grid-col-5 {
		display: grid;
		grid-template-columns: repeat(5,1fr);
	}
	.grid-cards {
		
	}
	.recommend-bg {
		background-image: url(../../assets/imgs/brand/recommend-banner-2.png);
		background-position: left top;
		background-size: 100% 560px;
		background-repeat: no-repeat;
		.model-title {
			padding: 40px 0;
		}
	}
}
</style>
