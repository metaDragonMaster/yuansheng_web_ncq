<template>
	<div class="brand-index">
		<!--     背景大图开始-->
		<div class="brand-index-banner ">
			<el-carousel trigger="click" height="500px">
				<el-carousel-item v-for="(item,index) in topBrand" :key="index"><img :src="item.photoUrl" /></el-carousel-item>
			</el-carousel>
		</div>
		<!--     背景大图结束-->
		<!--    品牌列表开始-->
		<div class="brand-index-list limit-max-width-inset">
			<h4>优质商家</h4>
			<!-- {{shop}} -->
			<ul class="brand-index-list-recommend">
				<li v-for="(item, index) in shop" @click="todetail(item)">
					<img :src="item.squareImageSmall" style="width: 160px; height: 160px;" />
					<div>
						<p>{{ item.shopName }}</p>
					</div>
				</li>
			</ul>
		</div>
		<!--    品牌列表结束-->

		<!--大牌推荐开始-->
		<div class="brand-index-big limit-max-width-inset">
			<h4>大牌推荐</h4>
			<!-- <div class="brand-index-big-images">
				<img :src="recommend[0].image" @click="recommendbtn(recommend[0])" />
				<img :src="recommend[1].image" @click="recommendbtn(recommend[1])" />
				<img :src="recommend[2].image" @click="recommendbtn(recommend[2])" />
				<img :src="recommend[3].image" @click="recommendbtn(recommend[3])" />
			</div> -->
			<div class="brand-index-big-images">
				<img v-for="item in recommend" :src="item.photoUrl" @click="recommendbtn(item)" 
					:class="{'pointer':item.photoType == 1}"
				/>
			</div>
		</div>
		<!--大牌推荐结束-->

		<!--    热卖品牌开始-->
		<div class="brand-index-list limit-max-width-inset">
			<h4>热卖商品</h4>
			<ul class="goods-list">
				<li v-for="(item, index) in commodity" @click="onPurchase(item.ghInfoId)">
					<img :src="item.goodsInfoImage" alt="" style="width: 215px; height: 215px;" />
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
		<!--    热卖品牌结束-->

		<!--  入驻流程开始-->
		<div class="brand-index-process flex-column-center limit-max-width-inset">
			<p class="title">如何入驻品牌馆 ?</p>
			<img src="../../assets/images/brand/id.png" />
			<div class="brand-index-process-list">
				<div class="brand-index-process-list-box" v-for="(item, index) in dataList" :key="index">
					<p class="mt20">{{ item.title }}</p>
					<!--<div class="brand-index-process-list-box-content">-->
					<!--&lt;!&ndash;<el-image :src="item.icon" :style="{ width: '72px', height: '72px' }"></el-image>&ndash;&gt;-->
					<!---->
					<!--</div>-->
				</div>
			</div>
		</div>
		<!--  入驻流程结束-->
	</div>
</template>

<script>
import Api from '@/api/brandShop.js';

export default {
	name: 'brandIndex',
	data() {
		return {
			dataList: Object.freeze([
				{
					title: '联系平台',
					icon: require('@/assets/images/brand/one.png')
				},
				{
					title: '签订入驻合约',
					icon: require('@/assets/images/brand/tow.png')
				},
				{
					title: '提交资料 , 成功入驻',
					icon: require('@/assets/images/brand/three.png')
				}
			]),

			//优质商家
			shop: [
				/*
					{
						squareImageSmall: require('@/assets/images/testimg/sj/1.jpg'),
						shopName: '兴蔬种业',
						introduction:
							'湖南兴蔬种业有限公司（简称：兴蔬种业）由湖南省农科院蔬菜研究所发起成立，是一家集蔬菜科研、生产、销售于一体的高新技术企业，现有员工65人，本科以上学历36人，其中博士3人，硕士8人，正研7人，副研15人。研发人员20人，占企业职工总人数的31%，人员结构合理，专业交叉混合，复合型人才居多，为企业的发展提供了可靠的人力保障。',
						mainBusiness: '蔬菜'
					},
					{
						squareImageSmall: require('@/assets/images/testimg/sj/2.jpg'),
						shopName: '汇美农业',
						introduction:
							'汇美农业科技有限公司，位于拥有“世外桃源”、“福地洞天”的国际花园城市湖南常德，系国内生产和加工水果罐头的品牌，年产量超过5万吨，是中国罐头协会会员。',
						mainBusiness: '果蔬、罐头'
					},
					{
						squareImageSmall: require('@/assets/images/testimg/sj/3.jpg'),
						shopName: '湘佳牧业',
						introduction:
							'湖南湘佳牧业股份有限公司是以“公司+农户+农贸市场”、 “公司+基地+直营”为经营模式，以“五统一、一分散”为企业运营特征的优质鸡养殖企业，经过10年多的摸索发展，已形成了从饲料和肥料生产、优质种禽繁育、优质家禽饲养到产品加工、销售于一体的完整产业链。',
						mainBusiness: '鸡、鸭'
					},
					{
						squareImageSmall: require('@/assets/images/testimg/sj/4.jpg'),
						shopName: '金健米业',
						introduction:
							'开发、生产、销售定型包装粮油及制品、食品包装材料；经营商品和技术的进出口业务。公司是我国粮食系统的第一家上市公司，是首批农业产业化国家重点龙头企业，公司生产的金健牌系列精米在国内具有很高的品牌优势和市场占有率。',
						mainBusiness: '大米、面条、米粉'
					},
					{
						squareImageSmall: require('@/assets/images/testimg/sj/5.jpg'),
						shopName: '河洲甲鱼',
						introduction: '“河洲龟鳖专业合作社”，开创了中国甲鱼产业的商业新模式是全国唯一一个集“种苗繁养、生态养殖、商贸流通、生态休闲”，四位一体的科技型专业合作社。',
						mainBusiness: '龟、鳖'
					},
					{
						squareImageSmall: require('@/assets/images/testimg/sj/6.jpg'),
						shopName: '海大集团',
						introduction:
							'海大集团，即广东海大集团股份有限公司（股票代码：002311）是一家涵盖饲料、种苗、生物制药、智慧养殖、食品流通、金融等全产业链的高新农牧企业集团，注册资本超15亿元。经过二十余年的高速发展，目前海大集团在海内外拥有350余家分子公司、近30000名员工，1个中央研究院、3大研发中心、十余个研发中试基地 。',
						mainBusiness: '饲料、种苗'
					}
				*/
			],

			//热卖品牌
			commodity: [],
			/*
					{
					    ghInfoId: 11,
					    name: "圣府第 厂家直销 5L食用油植物油 古法压榨 一级浓香小榨花生油",
					    goodsInfoImage: require("@/assets/images/testimg/ly/hsy/1.jpg"),
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
					    goodsInfoImage: require("@/assets/images/testimg/mc/tgy/1.jpg"),
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
					    goodsInfoImage: require("@/assets/images/testimg/ggsc/hxy/1.jpg"),
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
					    goodsInfoImage: require("@/assets/images/testimg/hhmm/hq/1.jpg"),
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
					    goodsInfoImage: require("@/assets/images/testimg/hhmm/xcs/1.jpg"),
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

			//大牌推荐
			recommend: [
				/*
					{
						image: require('@/assets/images/brand/img1.png'),
						ghInfoId: 11,
						name: '圣府第 厂家直销 5L食用油植物油 古法压榨 一级浓香小榨花生油',
						imageSmall: require('@/assets/images/testimg/ly/hsy/1.jpg'),
						price: '100',
						introduction: '最近成交 1535次',
						unit: '元/瓶',
					
						goodsImageList1: require('@/assets/images/testimg/ly/hsy/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ly/hsy/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ly/hsy/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ly/hsy/5.jpg'),
						goodsBrand: '圣府第',
						productAddress: '济宁市',
						goodsModel: '5L/瓶',
						type: '粮油作物'
					},
					{
						image: require('@/assets/images/brand/img2.png'),
						ghInfoId: 32,
						name: '新茶上市秋茶安溪铁观音内安溪高海拔产地消青浓香型高端商务茶',
						imageSmall: require('@/assets/images/testimg/mc/tgy/1.jpg'),
						price: '298',
						introduction: '最近成交 153次',
						unit: '元/斤',
					
						goodsImageList1: require('@/assets/images/testimg/mc/tgy/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/mc/tgy/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/mc/tgy/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/mc/tgy/5.jpg'),
						goodsBrand: '淘缘',
						productAddress: '泉州市',
						goodsModel: '清香型（消青）',
						type: '毛茶'
					},
					{
						image: require('@/assets/images/brand/img3.png'),
						ghInfoId: 41,
						name: '福建平和管溪柚子红心蜜柚渠道供货礼品订单一件代发应季水果批发',
						imageSmall: require('@/assets/images/testimg/ggsc/hxy/1.jpg'),
						price: '1.4',
						introduction: '最近成交 453次',
						unit: '元/个',
					
						goodsImageList1: require('@/assets/images/testimg/ggsc/hxy/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ggsc/hxy/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ggsc/hxy/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ggsc/hxy/5.jpg'),
						goodsBrand: '其他',
						productAddress: '漳州市',
						goodsModel: '具有品种特征，端正（mm）',
						type: '瓜果蔬菜'
					},
					{
						image: require('@/assets/images/brand/img4.png'),
						ghInfoId: 51,
						name: '黄芪中药材黄芪 滋补甘肃岷县黄芪 斜片圆片打粉新货批发大货供应',
						imageSmall: require('@/assets/images/testimg/hhmm/hq/1.jpg'),
						price: '21',
						introduction: '最近成交 1453次',
						unit: '元/斤',
					
						goodsImageList1: require('@/assets/images/testimg/hhmm/hq/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/hhmm/hq/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/hhmm/hq/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/hhmm/hq/5.jpg'),
						goodsBrand: '耀强药业',
						productAddress: '毫州市',
						goodsModel: '本品不能代替药物',
						type: '花卉苗木药材'
					}
				*/
			],

			topBrand: [
				{
					photoUrl: require('@/assets/images/brand/banner_jcpinpg.png')
				},
				{
					photoUrl: require('@/assets/images/brand/banner_jcpinpg.png')
				},
				{
					photoUrl: require('@/assets/images/brand/banner_jcpinpg.png')
				},
				{
					photoUrl: require('@/assets/images/brand/banner_jcpinpg.png')
				}
			]
		};
	},

	mounted() {
		this.qualityMerchantList();
		this.hotGoodsList();
		this.brandRecommendList();
	},
	methods: {
		onPurchase(id) {
			let url = '/#/goodsDetail/index?';
			let message = {
				fromMsg: 'purchase',
				id: id
			};

			for (var i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}

			url = url.substring(0, url.length - 1);

			this.$routerUtil.newWindow(url, '_blank');
		},
		todetail(item) {
			this.$routerUtil.toPath('/brand/detail', {
				brand: item.shopName,
				info: item.introduction,
				image: item.squareImageSmall,
				industry: item.mainBusiness,
				productAddress: item.productAddress,
				id: item.id
			});
		},

		recommendbtn(info) {
			// console.log(info)
			let url = '/#/goodsDetail/index?';
			let message = {
				fromMsg: 'purchase',
				id: info.ghInfoId
			};

			for (let i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}

			url = url.substring(0, url.length - 1);

			this.$routerUtil.newWindow(url, '_blank');
		},

		async qualityMerchantList() {
			let res = await Api.qualityMerchantList();
			// let res = await this.$store.dispatch('user/qualityMerchantList');
			// console.log(res.data.records)
			if (res.code == 10200) {
				this.shop = res.data.records;
			}
		},

		async hotGoodsList() {
			let res = await Api.hotGoodsList();
			// let res = await this.$store.dispatch('user/hotGoodsList');
			console.log(res.data);
			if (res.code == 10200) {
				this.commodity = res.data.records;
			}
		},

		async brandRecommendList() {
			let res = await Api.brandRecommendList();
			// let res = await this.$store.dispatch('user/brandRecommendList', 1);
			console.log(res.data);
			if (res.code == 10200) {
				// for (var i = 0; i < res.data.goodsRecommendSimpleVos.length; i++) {
				// 	let id = res.data.goodsRecommendSimpleVos[i].priority;
				// 	this.recommend[id - 1].image = res.data.goodsRecommendSimpleVos[i].image;
				// }

				// this.topBrand = res.data.merchantShopPropagatePhotoVos;
				this.recommend = res.data.brandPropagatePhotoVos;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.brand-index {
	background-color: #f4f5f9;
	padding-bottom: 30px;

	.brand-index-banner {
		height: 500px;
		margin: 0 auto 20px auto;
		width: 100%;
		max-width: 1920px;
		// background: url('~@/assets/images/banner/banner3.png') no-repeat left top / 100% 100%;
	}

	.brand-index-process,
	.brand-index-list,
	.brand-index-big {
		background-color: #fff;
		padding: 30px;
		/*padding: 30px;*/
		margin-bottom: 20px;

		& > h4 {
			font-size: 1.25rem;
			margin-bottom: 0.75rem;
			padding-left: 15px;
			border-left: 3px solid $ThemeColor;
		}
	}

	.brand-index-big-images {
		display: grid;
		grid-gap: 10px;
		grid-template-areas: 'a b b' 'a c d';

		img {
			cursor: pointer;

			&:nth-child(1) {
				grid-area: a;
				width: 28.375rem;
				height: 28.375rem;
			}

			&:nth-child(2) {
				grid-area: b;
				width: 41.75rem;
				height: 12.375rem;
			}

			&:nth-child(3) {
				grid-area: c;
			}

			&:nth-child(4) {
				grid-area: d;
			}

			&:nth-child(3),
			&:nth-child(4) {
				width: 20.375rem;
				height: 15.375rem;
			}
		}
	}

	.brand-index-list-recommend {
		display: flex;
		justify-content: space-between;

		li {
			position: relative;
			border: 1px #f2f2f2 solid;
			cursor: pointer;

			&:not(:last-child) {
				margin-right: 33px;
			}

			&:hover > div {
				opacity: 1;
				z-index: 2;
			}

			& > div {
				opacity: 0;
				position: absolute;
				width: 100%;
				height: 100%;
				background-color: rgba(51, 51, 51, 0.7);
				color: #ffffff;
				line-height: 159px;
				text-align: center;
				top: 0;
				transition: opacity 0.5s;
			}
		}
	}

	.goods-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 1rem;

		li {
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

	.brand-index-process {
		.title {
			text-align: center;
			font-size: 24px;
			margin-bottom: 57px;
			position: relative;

			&:after {
				content: '';
				position: absolute;
				top: 45px;
				left: 60px;
				width: 60px;
				height: 1px;
				background-color: $ThemeColor;
			}
		}

		img {
			height: 100px;
			width: 749px;
		}

		.brand-index-process-list {
			display: flex;
			justify-content: space-between;
			width: 1000px;

			/*.brand-index-process-list-box:last-child {*/
			/*&:after {*/
			/*content: '';*/
			/*visibility: hidden;*/
			/*}*/
			/*}*/

			.brand-index-process-list-box {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				position: relative;
				margin-top: 20px;

				//&:after {
				//	content: '';
				//	position: absolute;
				//	//top: 37px;
				//	right: -140px;
				//	width: 289px;
				//	height: 1px;
				//	background-color: #e2e2e2;
				//}

				p {
					font-size: 16px;
					width: 100%;
				}
			}
		}
	}
}
</style>
