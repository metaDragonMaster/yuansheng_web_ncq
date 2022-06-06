<template>
	<div class="brand-detail ">
		<div class="brand-detail-bread limit-max-width">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item :to="{ path: '/homepage' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/brand/index' }">品牌馆</el-breadcrumb-item>
				<el-breadcrumb-item>{{ brand }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="brand-detail-body limit-max-width-inset">
			<div class="brand-detail-body-img"></div>
			<!-- <div class="brand-detail-body-logo "><div class="brand-detail-body-logo-img"></div></div> -->
			<img :src="image" alt="" class="logo-image" />
			<div class="brand-detail-body-main">
				<h3>{{ brand }}</h3>
				<div class="cell ">
					<span>所在地区</span>
					<p>{{ productAddress }}</p>
				</div>
				<button>主营：{{ industry }}</button>
				<p class="remark">{{ info }}</p>
			</div>
		</div>

		<div class="brand-detail-goods limit-max-width-inset">
			<h4>商品展示</h4>
			<ul class="goods-list">
				<li v-for="(item, index) in commodity" @click="onPurchase(item.ghInfoId)">
					<img :src="item.imageSmall" alt="" style="width: 215px; height: 215px;" />
					<div>
						<h4>
							{{ item.goodsUnitPrice }}
							<span>元/{{ item.unit }}</span>
						</h4>
						<p class="font-hide-2">{{ item.name }}</p>
						<p class="ps">最近成交 {{ item.successTxCount }}次</p>
						<button>我要采购</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Api from '@/api/brandShop.js';
export default {
	name: 'detail',
	data() {
		return {
			banner: require('@/assets/images/brand/brandBig.png'),
			brand: '',
			info: '',
			image: '',
			industry: '',
			productAddress: '',
			id: '',

			commodity: []
			/*

				    {
				        ghInfoId: 11,
				        name: "圣府第 厂家直销 5L食用油植物油 古法压榨 一级浓香小榨花生油",
				        imageSmall: require("@/assets/images/testimg/ly/hsy/1.jpg"),
				        goodsUnitPrice: "100",
				        successTxCount: "1535",
				        unit: "瓶",

				        goodsImageList1: require("@/assets/images/testimg/ly/hsy/2.jpg"),
				        goodsImageList2: require("@/assets/images/testimg/ly/hsy/3.jpg"),
				        goodsImageList3: require("@/assets/images/testimg/ly/hsy/4.jpg"),
				        goodsImageList4: require("@/assets/images/testimg/ly/hsy/5.jpg"),
				        goodsBrand: "圣府第",
				        productAddress: "济宁市",
				        goodsModel: "5L/瓶",
				        type: "粮油作物",
				    },
				    {
				        ghInfoId: 32,
				        name: "新茶上市秋茶安溪铁观音内安溪高海拔产地消青浓香型高端商务茶",
				        imageSmall: require("@/assets/images/testimg/mc/tgy/1.jpg"),
				        goodsUnitPrice: "298",
				        successTxCount: "153",
				        unit: "斤",

				        goodsImageList1: require("@/assets/images/testimg/mc/tgy/2.jpg"),
				        goodsImageList2: require("@/assets/images/testimg/mc/tgy/3.jpg"),
				        goodsImageList3: require("@/assets/images/testimg/mc/tgy/4.jpg"),
				        goodsImageList4: require("@/assets/images/testimg/mc/tgy/5.jpg"),
				        goodsBrand: "淘缘",
				        productAddress: "泉州市",
				        goodsModel: "清香型（消青）",
				        type: "毛茶",
				    },
				    {
				        ghInfoId: 41,
				        name: "福建平和管溪柚子红心蜜柚渠道供货礼品订单一件代发应季水果批发",
				        imageSmall: require("@/assets/images/testimg/ggsc/hxy/1.jpg"),
				        goodsUnitPrice: "1.4",
				        successTxCount: "453",
				        unit: "个",

				        goodsImageList1: require("@/assets/images/testimg/ggsc/hxy/2.jpg"),
				        goodsImageList2: require("@/assets/images/testimg/ggsc/hxy/3.jpg"),
				        goodsImageList3: require("@/assets/images/testimg/ggsc/hxy/4.jpg"),
				        goodsImageList4: require("@/assets/images/testimg/ggsc/hxy/5.jpg"),
				        goodsBrand: "其他",
				        productAddress: "漳州市",
				        goodsModel: "具有品种特征，端正（mm）",
				        type: "瓜果蔬菜",
				    },
				    {
				        ghInfoId: 51,
				        name: "黄芪中药材黄芪 滋补甘肃岷县黄芪 斜片圆片打粉新货批发大货供应",
				        imageSmall: require("@/assets/images/testimg/hhmm/hq/1.jpg"),
				        goodsUnitPrice: "21",
				        successTxCount: "1453",
				        unit: "斤",

				        goodsImageList1: require("@/assets/images/testimg/hhmm/hq/2.jpg"),
				        goodsImageList2: require("@/assets/images/testimg/hhmm/hq/3.jpg"),
				        goodsImageList3: require("@/assets/images/testimg/hhmm/hq/4.jpg"),
				        goodsImageList4: require("@/assets/images/testimg/hhmm/hq/5.jpg"),
				        goodsBrand: "耀强药业",
				        productAddress: "毫州市",
				        goodsModel: "本品不能代替药物",
				        type: "花卉苗木药材",
				    },
				    {
				        ghInfoId: 52,
				        name: "泰安基地大量出售现货红油香椿小树 矮化香椿树",
				        imageSmall: require("@/assets/images/testimg/hhmm/xcs/1.jpg"),
				        goodsUnitPrice: "1.3",
				        successTxCount: "1453",
				        unit: "颗",

				        goodsImageList1: require("@/assets/images/testimg/hhmm/xcs/2.jpg"),
				        goodsImageList2: require("@/assets/images/testimg/hhmm/xcs/3.jpg"),
				        goodsImageList3: require("@/assets/images/testimg/hhmm/xcs/4.jpg"),
				        goodsImageList4: require("@/assets/images/testimg/hhmm/xcs/5.jpg"),
				        goodsBrand: "背靠大树",
				        productAddress: "泰安市",
				        goodsModel: "红油香椿苗,大棚矮化香椿苗",
				        type: "花卉苗木药材",
				    },

			*/
		};
	},
	mounted() {
		this.brand = this.$route.query.brand;
		this.info = this.$route.query.info;
		this.image = this.$route.query.image;
		this.industry = this.$route.query.industry;
		this.id = this.$route.query.id;
		this.productAddress = this.$route.query.productAddress;
		this.hotGoodsList();
	},
	methods: {
		wantBuy() {
			this.$routerUtil.toName('goodsDetail', { fromMsg: 'purchase' });
		},
		onPurchase(id) {
			let url = '/#/goodsDetail/index?';
			let message = {
				fromMsg: 'purchase',
				id: id
			};
			for (let i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}
			url = url.substring(0, url.length - 1);
			this.$routerUtil.newWindow(url, '_blank');
		},
		async hotGoodsList() {
			let res = await Api.hotGoodsList({ merchantShopId: this.id });
			// let res = await this.$store.dispatch('user/hotGoodsList');
			console.log(res.data);
			if (res.code == 10200) {
				this.commodity = res.data.records;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.brand-detail {
	background-color: #f4f5f9;
	padding-bottom: 2rem;
	.brand-detail-bread {
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	.brand-detail-body {
		background-color: #fff;
		.brand-detail-body-img {
			height: 340px;
			background-image: url(../../assets/images/brand/brandBig.png);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: left top;
		}
		.logo-image {
			width: 180px;
			height: 180px;
			margin: -76px auto 0 auto;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.04);
			border-radius: 50%;
			display: block;
		}
		.brand-detail-body-main {
			padding-bottom: 30px;
			h3 {
				font-size: 30px;
				margin-top: 20px;
				margin-bottom: 24px;
				text-align: center;
			}
			button {
				/*background-color: rgba(255,255,255,0.2);*/
				background-color: rgba(242, 45, 36, 0.08);
				padding: 9px 30px;
				color: $ThemeColor;
				margin: 20px auto 0 auto;
				// width: fit-content;
				display: block;
			}
			.remark {
				width: 695px;
				margin: 40px auto 0 auto;
				font-size: 16px;
			}
			.cell {
				font-size: 14px;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					color: #999999;
					margin-right: 20px;
				}
			}
		}
	}

	.brand-detail-goods {
		margin-top: 20px;
		background-color: #fff;
		padding: 30px;
		h4 {
			margin-bottom: 1rem;
		}
		.goods-list {
			display: grid;
			grid-template-columns: repeat(5, 1fr);
			grid-gap: 1rem;
			li {
				// &:not(:last-child) {
				// 	margin-right: 1rem;
				// }
				&:hover {
					.ps,
					h4 {
						display: none;
					}
					.font-hide-2 {
						margin-top: 20px;
					}
					button {
						display: block;
					}
				}
				h4 {
					font-size: 18px;
					margin-top: 20px;
					color: $ThemeColor;
					span {
						font-size: 14px;
					}
				}
				.font-hide-2 {
					font-size: 0.875rem;
					margin-top: 12px;
				}
				.ps {
					font-size: 0.75rem;
					margin-top: 12px;
					color: #999999;
				}
				button {
					display: none;
					background-color: $ThemeColor;
					color: #ffffff;
					width: 100%;
					margin-top: 20px;
					padding: 12px;
					border-radius: 4px;
				}
			}
		}
	}
}
</style>
