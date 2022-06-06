<template>
	<ul class="type-select">
		<li v-for="(item,index) in list" :key="index" :class="{'active':active == index}" @click="active = index">
			<img v-if="item.image" :src="active == index? item.imageActive:item.image" alt="">
			<p>{{item.title}}</p>
		</li>
	</ul>
</template>
<script>
export default {
	data(){return{
		active:0,
		list:[
			{
				title:"全部"
			},
			{
				image:require('@/assets/imgs/models/typeSelect/1.png'),
				imageActive:require('@/assets/imgs/models/typeSelect/1-active.png'),
				title:"粮食作物",
			},
			{
				image:require('@/assets/imgs/models/typeSelect/2.png'),
				imageActive:require('@/assets/imgs/models/typeSelect/2-active.png'),
				title:"苗木药材",
			},
			{
				image:require('@/assets/imgs/models/typeSelect/3.png'),
				imageActive:require('@/assets/imgs/models/typeSelect/3-active.png'),
				title:"毛茶花卉",
			},
			{
				image:require('@/assets/imgs/models/typeSelect/4.png'),
				imageActive:require('@/assets/imgs/models/typeSelect/4-active.png'),
				title:"瓜果浓茶",
			},
			{
				image:require('@/assets/imgs/models/typeSelect/5.png'),
				imageActive:require('@/assets/imgs/models/typeSelect/5-active.png'),
				title:"畜禽水产",
			},
		]
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
.type-select {
	display: flex;
	li {
		display: flex;
		align-items: center;
		padding: 8px 0;
		border: 1px solid #333333;
		border-radius: 10px;
		margin-right: 10px;
		&.active {
			background-color: #4BC427;
			border-color: #4BC427;
			color: #FFFFFF;
			img {
				border-color: #FFFFFF;
			}
		}
		img {
			width: 42px;
			height: 26px;
			padding: 0 8px;
			border-right: 1px solid #333333;
		}
		p {
			padding: 0 16px;
		}
	}
}
</style>
