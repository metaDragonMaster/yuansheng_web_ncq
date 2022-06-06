<template>
	<div class="purchase">
		<Banner></Banner>
		<div class="no-2 limit-max-width">
			<el-row :gutter="14">
				<el-col :span="5">
					<!-- 类型选择菜单 -->
					<TypeMenu></TypeMenu>
					<div class="current-season">
						<p class="h-1">当季需求</p>
						<ul class="grid-col-2">
							<li class="infor-card" v-for="item in 4">
								<img src="@/assets/imgs/models/good-image.png" alt="" />
								<p class="title font-hide-2">农用撒肥车干湿两用大棚均匀施 农用撒肥车干湿两用大棚均匀施</p>
								<p class="flex-js-sb">
									<span>农用机器</span>
									<span>湖南 常德</span>
								</p>
							</li>
						</ul>
					</div>
				</el-col>
				<el-col :span="19">
					<!-- 类型选择按钮 -->
					<div class="flex-js-sb select-buttons">
						<TypeSelect></TypeSelect>
						<div class="send-button">
							<i class="icon el-icon-plus"></i>
							<p>发布需求</p>
						</div>
					</div>
					<el-table
						:data="tableData"
						v-loading="tableLoading"
						tooltip-effect="dark"
						:header-cell-style="{ textAlign: 'center', 'background-color': '#f9f9f9', color: '#333333' }"
						:cell-style="{ textAlign: 'center' }"
					>
						<el-table-column label="商品" porp="image" width="160px">
							<template v-slot="{ row }">
								<img :src="row.image" alt="图片加载失败" />
							</template>
						</el-table-column>
						<el-table-column>
							<template v-slot="{ row }" prop="info">
								<div class="flex-column-js-sb text-align-left">
									<p>{{ row.info.p }}</p>
									<span>{{ row.info.span }}</span>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="品牌" porp="brand" width="150px"></el-table-column>
						<el-table-column label="产地" porp="address" width="150px"></el-table-column>
						<el-table-column label="操作"  width="150px">
							<template v-slot="{ row }">
								<button class="button-success">立即采购</button>
							</template>
						</el-table-column>
					</el-table>
					<TablePagination align="center" :size="size" :current="current" :total="100" layout="prev, pager, next"></TablePagination>
				</el-col>
			</el-row>
		</div>
		<img class="footer-image" src="@/assets/imgs/purchase/footer.png" alt="" />
	</div>
</template>

<script>
import Banner from './modules/banner.vue';
import TypeSelect from "./modules/TypeSelect.vue"
import TypeMenu from '@/components/TypeMenu/index.vue';

import TablePagination from '@/components/TablePagination/index.vue';
export default {
	data() {
		return {
			tableData: [
				{
					id: '1',
					image: require('@/assets/imgs/purchase/good.png'),
					info: {
						p: '微耕机柴油汽油旋耕机松土机锄草机除草机小型拖拉机农用机械田园翻地机起垄耕地机农机犁地机',
						span: '这里显示型号规格'
					},
					brand: '蓝翔',
					address: '常德市'
				},
				{
					id: '2',
					image: require('@/assets/imgs/purchase/good.png'),
					info: {
						p: '微耕机柴油汽油旋耕机松土机锄草机除草机小型拖拉机农用机械田园翻地机起垄耕地机农机犁地机',
						span: '这里显示型号规格'
					},
					brand: '蓝翔',
					address: '常德市'
				}
			],
			tableLoading: false,
			size: 10,
			current: 1
		};
	},
	components: {
		Banner,
		TypeSelect,
		TypeMenu,
		TablePagination
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped="scoped">
.grid-col-2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 8px;
}
.current-season {
	.h-1 {
		padding: 8px 0;
	}
}
.text-align-left {
	text-align: left;
	p {
		margin-bottom: 64px;
	}
}
.infor-card {
	padding: 6px;
	font-size: 12px;
	border-radius: 10px;
	box-shadow: 0px 0px 19px 3px #eeeeee;
	img {
	}
	.title {
		margin-bottom: 12px;
		margin-top: 4px;
	}
	span {
		color: #666666;
	}
}
.button-success {
	background-color: #4BC427;
	color: #FFFFFF;
	width: 100%;
	height: 36px;
	border-radius: 10rem;
}
.select-buttons {
	margin-top: 15px;
}
.el-table {
	margin-top: 25px;
}
.send-button {
	background-color: #303030;
	width: 156px;
	height: 46px;
	padding: 8px 24px;
	border-radius: 10rem;
	display: flex;
	align-items: center;
	.icon {
		background-color: #FFF;
		border-radius: 50%;
		padding: 2px;
		font-weight: bold;
		font-size: 14px;
	}
	p {
		color: #FFF;
		font-size: 20px;
		padding-left: 10px;
		margin-top: -2px;
	}
}
.footer-image {
	margin-top: 120px;
}
</style>
