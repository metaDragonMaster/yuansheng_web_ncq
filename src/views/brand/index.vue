<template>
	<div class="brand-view">
		<Banner></Banner>
		<div class="model-title">合作<span>品牌</span></div>
		<ul class="grid-col-5 grid-cards limit-max-width">
			<li>
				<img src="@/assets/imgs/homepage/cooperation-swiper/19.png" alt="">
			</li>
			<li>
				<img src="@/assets/imgs/homepage/cooperation-swiper/2.png" alt="">
			</li>
			<li>
				<img src="@/assets/imgs/homepage/cooperation-swiper/4.png" alt="">
			</li>
			<li>
				<img src="@/assets/imgs/homepage/cooperation-swiper/5.png" alt="">
			</li>
			<li>
				<img src="@/assets/imgs/homepage/cooperation-swiper/6.png" alt="">
			</li>
		</ul>
		<div class="recommend-bg">
			<div class="model-title color-white">大牌<span>推荐</span></div>
			<Recommend></Recommend>
		</div>
		<div class="model-title ">热卖<span>商品</span></div>
		<ul class="grid-col-5 good-cards limit-max-width">
			<li v-for="item in 5">
				<img src="@/assets/imgs/models/good-image.png" alt="">
				<p class="good-card-title font-hide-2">
					农用撒肥车干湿两用大棚均匀施肥农用机器全备份农用撒肥车干湿两用大棚均匀施肥农用机器全备份
				</p>
				<p class="good-card-sub-title flex-center-js-sb">
					<span>农用机械</span>
					<span>湖南常德</span>
				</p>
				<button class="button-success">立即采购</button>
			</li>
		</ul>
		<div class="no-4 color-white bg-green limit-max-width">
			<div class="model-title">如何入驻品牌馆</div>
			<ul class="step-list">
				<li>
					<div class="step step-1">
						<div class="content left"><div class="circle left-circle"></div></div>
						1
						<div class="content right"><div class="circle right-circle"></div></div>
					</div>
					<p>第一步</p>
					<span>联系平台，原生标准认证</span>
				</li>
				<li>
					<div class="step step-2">
						<div class="content left"><div class="circle left-circle"></div></div>
						2
						<div class="content right"><div class="circle right-circle"></div></div>
					</div>
					<p>第二步</p>
					<span>签订入驻合约</span>
				</li>
				<li>
					<div class="step step-3">
						<div class="content left"><div class="circle left-circle"></div></div>
						3
						<div class="content right"><div class="circle right-circle"></div></div>
					</div>
					<p>第三步</p>
					<span>提交资料，成功入驻</span>
				</li>
			</ul>
		</div>
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
		&.color-white {
			color: white;
		}
		span {
			color: #4BC427;
		}
	}
	.grid-col-5 {
		display: grid;
		grid-template-columns: repeat(5,1fr);
		grid-gap: 10px;
	}
	.grid-cards {
		padding-bottom: 100px;
		li {
			padding: 20px;
			box-shadow: 0 2px 10px 4px rgba($color: #000000, $alpha: 0.05);
			border-radius: 18px;
		}
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
	.good-cards li{
		padding: 14px;
		border-radius: 18px;
		box-shadow: 0px 2px 10px 3px rgba(0, 0, 0, 0.05);
		margin-bottom: 80px;
		.good-card-title {
			margin-top: 16px;
		}
		.good-card-sub-title {
			margin-top: 16px;
			span {
				font-size: 12px;
				color: #666666;
			}
		}
		.button-success {
			background-color: #4BC427;
			color: #FFFFFF;
			width: 100%;
			border-radius: 10rem;
			height: 36px;
			margin-top: 25px;
		}
	}
	.no-4 {
		.model-title {
			padding-top: 20px;
			margin-top: 0;
		}
		.step-list {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			place-items: center;
			padding: 50px 0;
			text-align: center;
			li:not(:last-child) {
				.step {
					&::before ,
					&::after {
						content: '';
						display: block;
						margin-top: -6px;
						position: absolute;
						top: 50%;
					}
					&::after {
						right: -230%;
						width: 154px;
						margin-top: - 4px;
						border-top: 8px dotted #D8D8D8;
					}
					&::before {
						right: calc(-230% - 18px);
						top: calc(50% + 1px);
						border-radius: 50%;
						width: 10px;
						height: 10px;
						background-color: #D8D8D8;
						
					}
				}
			}
			.step {
				font-size: 38px;
				border: 2px solid #4BC427;
				border-radius: 50%;
				line-height: 110px;
				height: 110px;
				width: 110px;
				margin: 0 auto;
				position: relative;
				margin-bottom: 20px;
	
				.content {
					position: absolute;
					width: 60px;
					height: 120px;
					top: -6px;
					margin: 0;
					padding: 0;
					overflow: hidden;
				}
	
				.circle {
					position: absolute;
					margin: 0;
					width: 120px;
					height: 120px;
					border-radius: 50%;
					border: 10px solid transparent;
					// transform: rotate(135deg);
					transition: all 0.3s;
				}
				.left {
					left: -6px;
				}
				.right {
					transform: rotate(180deg);
					right: -6px;
				}
	
				.left-circle {
					border-top-color: #4BC427;
					border-left-color: #4BC427;
					// transform: rotate(45deg);
					// animation: circle-left 5s linear infinite;
				}
	
				.right-circle {
					border-bottom-color: #4BC427;
					border-right-color: #4BC427;
					// animation: circle-right 5s linear infinite;
				}
	
				&.step-1 {
					.left-circle {
						transform: rotate(135deg);
					}
					.right-circle {
						transform: rotate(75deg);
					}
				}
	
				&.step-2 {
					.left-circle {
						transform: rotate(-175deg);
					}
					.right-circle {
						transform: rotate(135deg);
					}
				}
				&.step-3 {
					.left-circle {
						transform: rotate(-45deg);
					}
					.right-circle {
						transform: rotate(135deg);
					}
				}
			}
	
			.step + p {
				font-size: 22px;
			}
			.step + p + span {
				color: #666666;
			}
		}
	}
}
</style>
