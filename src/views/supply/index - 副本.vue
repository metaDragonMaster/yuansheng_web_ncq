<template>
	<div id="supply">
		<div class="banner limit-max-width">
			<div class="banner-title flex-column-center">
				<h1>互联网赋能农业</h1>
				<div class="hr"></div>
				<h4>INTERNET ENABLED AGRICULTURE</h4>
			</div>
		</div>
		<el-row class="limit-max-width" id="anchor" ref="Anchor">
			<!-- <el-col :span="19"> -->
			<div class="table-select limit-max-width-inset">
				<div class="flex sticky">
					<EasySlidSelect
						:list="tableTypeList"
						ref="EasySlidSelect"
						class="easySlidSelect"
						@change="
							info => {
								changeselect(info);
							}
						"
					></EasySlidSelect>
					<!-- <el-button @click="scrollTo">scrollTo</el-button> -->
					<el-button size="small" class="release" @click="sendGoods()">发布货源</el-button>
				</div>

				<el-table
					:data="showData"
					v-loading="isLoading"
					ref="TableDom"
					:key="itemKey"
					:header-cell-style="{ textAlign: 'center', 'background-color': '#F9F9F9' }"
					:cell-style="{ textAlign: 'center' }"
					stripe
				>
					<el-table-column label="需求产品" width="200px">
						<template v-slot="{ row }">
							<div class="table-select-tips"><img :src="row.goodsInfoImage" @click="operationclick(row.cgInfoId)" /></div>
						</template>
					</el-table-column>
					<el-table-column label="" width="400px">
						<template v-slot="{ row }">
							<div class="table-select-tips">
								<div style="width: 336px;">
									<p @click="operationclick(row.cgInfoId)">{{ row.goodsName }}</p>
									<span>{{ row.goodsModel }}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="goodsNum" label="需求数量">
						<template v-slot="{ row }">
							{{ row.goodsNum + row.unit }}
						</template>
					</el-table-column>
					<el-table-column prop="endTime" label="需求时间"></el-table-column>
					<el-table-column label="操作">
						<template v-slot="{ row }">
							<button class="operationbtn" @click="operationclick(row.cgInfoId)">我要供货</button>
						</template>
					</el-table-column>
				</el-table>
				<TablePagination
					:total="tableQueryOption.total"
					:size="tableQueryOption.size"
					:current="tableQueryOption.current"
					layout="prev, pager, next,jumper"
					@currentChange="
						val => {
							tableQueryOption.current = val;
							getTableData();
						}
					"
					@sizeChange="
						val => {
							tableQueryOption.size = val;
							getTableData();
						}
					"
				/>
			</div>
		</el-row>
	</div>
</template>
<script>
import EasySlidSelect from '@/components/EasySlidSelect/index.vue';
import TablePagination from '@/components/TablePagination/index.vue';
import ApiAuth from '@/api/auth.js';
import scrollToMixin from '../../utils/scrollToMixin.js';

export default {
	mixins: [scrollToMixin],
	data() {
		return {
			itemKey: '0',
			tableTypeList: [
				{
					goodsType: '粮油作物'
				},
				{
					goodsType: '毛茶'
				},
				{
					goodsType: '瓜果蔬菜'
				},
				{
					goodsType: '花卉苗木药材'
				},
				// {
				//     goodsType: '经济作物'
				// },
				{
					goodsType: '畜禽水产'
				}
			],
			isLoading: false,
			//总数据
			tableData: [
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/ly/hsy/1.jpg'),
						goodsName: '圣府第 厂家直销 5L食用油植物油 古法压榨 一级浓香小榨花生油',
						goodsModel: '5L/瓶',
						goodsNum: 5,
						unit: '瓶',
						cgInfoId: 11,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ly/hsy/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ly/hsy/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ly/hsy/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ly/hsy/5.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/ly/xm/1.jpg'),
						goodsName: '年份新米黑龙江东北大米5kg长粒香米粳米',
						goodsModel: '5000（g）',
						goodsNum: 5,
						unit: 'g',
						cgInfoId: 12,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ly/xm/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ly/xm/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ly/xm/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ly/xm/5.jpg')
					}
				],

				[
					{
						goodsInfoImage: require('@/assets/images/testimg/mc/pec/1.jpg'),
						goodsName: '厂家批发云南普洱茶 2021年帕沙头春茶 晒青毛茶散装茶叶产地现货',
						goodsModel: '500g',
						goodsNum: 5,
						unit: '包',
						cgInfoId: 31,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/mc/pec/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/mc/pec/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/mc/pec/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/mc/pec/5.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/mc/tgy/1.jpg'),
						goodsName: '新茶上市秋茶安溪铁观音内安溪高海拔产地消青浓香型高端商务茶',
						goodsModel: '清香型（消青）',
						goodsNum: 5,
						unit: '斤',
						cgInfoId: 32,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/mc/tgy/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/mc/tgy/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/mc/tgy/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/mc/tgy/5.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/ggsc/hxy/1.jpg'),
						goodsName: '福建平和管溪柚子红心蜜柚渠道供货礼品订单一件代发应季水果批发',
						goodsModel: '具有品种特征，端正（mm）',
						goodsNum: 5,
						unit: '个',
						cgInfoId: 41,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ggsc/hxy/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ggsc/hxy/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ggsc/hxy/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ggsc/hxy/5.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/ggsc/td/1.jpg'),
						goodsName: '黄皮土豆十斤装中大个包邮土豆农家土豆马铃薯现挖黄心大洋芋批发',
						goodsModel: '十斤装,五斤',
						goodsNum: 5,
						unit: '斤',
						cgInfoId: 42,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/ggsc/td/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/ggsc/td/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/ggsc/td/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/ggsc/td/5.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/hhmm/hq/1.jpg'),
						goodsName: '黄芪中药材黄芪 滋补甘肃岷县黄芪 斜片圆片打粉新货批发大货供应',
						goodsModel: '本品不能代替药物',
						goodsNum: 5,
						unit: '斤',
						cgInfoId: 51,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/hhmm/hq/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/hhmm/hq/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/hhmm/hq/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/hhmm/hq/5.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/hhmm/xcs/1.jpg'),
						goodsName: '泰安基地大量出售现货红油香椿小树 矮化香椿树',
						goodsModel: '红油香椿苗,大棚矮化香椿苗',
						goodsNum: 5,
						unit: '颗',
						cgInfoId: 52,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/hhmm/xcs/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/hhmm/xcs/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/hhmm/xcs/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/hhmm/xcs/5.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/hhmm/lzs/1.jpg'),
						goodsName: '果树基地大量批发1-5公分金丝枣树 梨枣树 葫芦枣树',
						goodsModel: '成苗',
						goodsNum: 5,
						unit: '颗',
						cgInfoId: 53,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/hhmm/lzs/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/hhmm/lzs/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/hhmm/lzs/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/hhmm/lzs/5.jpg')
					}
				],
				[
					{
						goodsInfoImage: require('@/assets/images/testimg/xmsc/dzx/1.jpg'),
						goodsName: 'E缅甸雄蟹空运 孟加拉青蟹鲜活 公螃蟹野生1只80g左右香辣蟹',
						goodsModel: '80g',
						goodsNum: 5,
						unit: '只',
						cgInfoId: 21,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/xmsc/dzx/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/xmsc/dzx/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/xmsc/dzx/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/xmsc/dzx/5.jpg')
					},
					{
						goodsInfoImage: require('@/assets/images/testimg/xmsc/n/1.jpg'),
						goodsName: '夏洛莱活牛价格 西门塔尔牛 利木赞孕牛肉牛犊牛苗小牛崽种牛',
						goodsModel: '利木赞牛',
						goodsNum: 5,
						unit: '只',
						cgInfoId: 22,
						endTime: '2021-8-17',
						detailAddress: '常德',
						goodsImageList1: require('@/assets/images/testimg/xmsc/n/2.jpg'),
						goodsImageList2: require('@/assets/images/testimg/xmsc/n/3.jpg'),
						goodsImageList3: require('@/assets/images/testimg/xmsc/n/4.jpg'),
						goodsImageList4: require('@/assets/images/testimg/xmsc/n/5.jpg')
					}
				]
			],
			showData: [],
			showType: 0,
			tableQueryOption: {
				total: 10,
				current: 1,
				size: 10
			}
		};
	},
	components: {
		EasySlidSelect,
		TablePagination
	},
	computed: {},
	mounted() {
		this.ghlist();
		this.ghGoodsTypeList();
	},
	methods: {
		//更新数据
		getTableData() {
			this.ghlist();
			this.$routerUtil.toPath('/supply', { showType: this.showType, current: this.tableQueryOption.current });
		},

		//翻页
		changeselect(info) {
			this.showType = info.index;
			this.tableQueryOption.current = 1;
			this.tableQueryOption.total = this.tableData.length;
			this.getTableData();
		},

		//进入详情页
		operationclick(index) {
			let url = '/#/goodsDetail/index?';
			let message = {
				// goodsInfo
				fromMsg: 'supply',
				id: index,
				showType: this.showType,
				current: this.tableQueryOption.current
			};

			for (var i in message) {
				if (message[i] != undefined) {
					url += i + '=' + message[i] + '&';
				}
			}

			url = url.substring(0, url.length - 1);

			url = url.replace('%', '-');

			this.$routerUtil.newWindow(url, '_blank');
		},

		//发布货源
		sendGoods() {
			this.$routerUtil.toPath('/supply/releaseSource', {
				showType: this.showType,
				current: this.tableQueryOption.current
			});
		},

		async ghlist() {
			let current = this.tableQueryOption.current;
			let size = this.tableQueryOption.size;
			let goodsTypeId = this.showType;

			let res;
			if (goodsTypeId == -1) {
				res = await ApiAuth.ghlist({
					current,
					size
				});
			} else {
				res = await ApiAuth.ghlist({
					current,
					size,
					goodsTypeId
				});
			}

			// let res = await this.$store.dispatch('user/ghlist', );
			console.log(res.data);
			if (res.code == 10200) {
				this.tableQueryOption.total = res.data.total;
				this.showData = res.data.records;
			}
		},

		async ghGoodsTypeList() {
			let res = await ApiAuth.ghGoodsTypeList();
			// let res = await this.$store.dispatch('user/cglist',);
			console.log(res.data);
			if (res.code == 10200) {
				this.tableTypeList = [
					{
						goodsType: '全部',
						goodsTypeId: -1
					}
				];
				this.tableTypeList = this.tableTypeList.concat(res.data);
			}
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
#supply {
	background-color: #f2f3f5;
}

.banner {
	background-image: url(../../assets/images/supply/banner_woyaogh.png);
	//height: 15.375rem;
	height: 350px;
	.banner-title {
		height: 100%;
		color: #069b87;
		font-weight: bold;
		/*text-shadow: 0 0.085rem 0.11rem #000000;*/
		/*padding-right: 40rem;*/

		h1 {
			font-size: 70px;
			display: inline-block;
			margin-bottom: 20px;
			letter-spacing: 6px;
		}

		.hr {
			height: 0.125rem;
			background-color: #069b87;
			width: 530px;
			margin-bottom: 20px;
			//box-shadow: 0 0.105rem 0.15rem #000000;
		}

		h4 {
			font-size: 26px;
			font-weight: 400;
			letter-spacing: 3px;
		}
	}
}

.el-row.limit-max-width {
	padding-top: 1.875rem;
	padding-bottom: 1.875rem;
	min-height: 800px;
}

.table-select {
	background-color: #ffffff;
	padding: 0 1rem 1rem 1rem;
	position: relative;
	.easySlidSelect {
		width: 880px;
	}
	.sticky {
		position: sticky;
		top: 38px;
		left: 0;
		background-color: #ffffff;
		z-index: 100;
	}

	.release {
		width: 90px;
		height: 36px;
		margin: 10px 20px 0 auto;
		background-color: $ThemeColor;
		color: white;
	}

	.table-select-tips {
		display: flex;
		flex-direction: row;
		height: 121px;

		img {
			height: 120px;
			width: 120px;
			cursor: pointer;
			margin: 0 auto;
		}

		div {
			position: relative;
			width: 336px;
			p {
				margin-left: 20px;
				margin-top: 10px;
				text-align: left;
				font-weight: bold;
				color: #333333;
				cursor: pointer;
			}

			span {
				position: absolute;
				bottom: 10px;
				left: 20px;
				color: #999999;
				text-align: left;
			}
		}
	}

	.operationbtn {
		background-color: #ffffff;
		border: $ThemeColor 1px solid;
		border-radius: 2px;
		color: $ThemeColor;
		width: 90px;
		height: 36px;

		&:hover {
			background-color: $ThemeColor;
			color: #ffffff;
		}
	}
}

.shop-from {
	background-color: #ffffff;
	padding: 0 1rem 1rem 1rem;

	h4 {
		font-size: 1.5rem;
		padding: 1rem 0;
		font-weight: 500;
	}

	button {
		width: 100%;
		background-color: $ThemeColor;
		color: #ffffff;
		padding: 0.75rem;
	}
}
</style>
