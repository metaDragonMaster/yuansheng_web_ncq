<template>
	<el-pagination
		:class="{
			right: align == 'right',
			center: align == 'center',
			left: align == 'left'
		}"
		:layout="layout"
		:total="total"
		:page-size="size"
		:page-sizes="sizes"
		:current-page="current"
		@current-change="currentChange"
		@size-change="sizeChange"
	></el-pagination>
</template>
<script>
export default {
	data() {
		return {};
	},
	props: {
		align: {
			type: String,
			default: 'right',
			validator(value) {
				return ['right', 'center', 'left'].includes(value);
			}
		},
		total: {
			type: Number,
			default: 0
		},
		current: {
			type: Number,
			default: 1
		},
		size: {
			type: Number,
			default: 10
		},
		sizes: {
			type: Array,
			default: () => [10]
		},
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper'
		}
	},
	methods: {
		currentChange(val) {
			this.$emit('currentChange', val);
		},
		sizeChange(val) {
			this.$emit('sizeChange', val);
		}
	}
};
</script>
<style lang="scss" scoped="scoped">
.el-pagination {
	width: fit-content;
	::v-deep .btn-next,
	::v-deep .btn-prev,
	::v-deep .btn-quicknext,
	::v-deep .el-pager li.number {
		border: 1px solid #e0dfdf;
		border-radius: 4px;
		margin: 0 2px;
		height: 38px;
		width: 38px;
		line-height: 38px;
	}
	::v-deep .btn-next {
		padding-left: 6px;
	}
	::v-deep .btn-prev {
		padding-right: 6px;
	}
	::v-deep .el-pager li.number.active {
		color: #ffffff;
		background-color: #53b753;
	}
}
.left {
	margin: 1rem 0;
}
.center {
	margin: 1rem auto;
}
.right {
	margin: 1rem 1rem 0 auto;
}
</style>
