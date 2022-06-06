export default {
	mounted(){
		this.scrollTo();
	},
	methods:{
		scrollTo() {
			this.$nextTick(()=>{
				let top = this.$refs['Anchor'].$el.offsetTop - 10;
				console.log("top-----",top)
				window.scrollTo({
					top: top,
					behavior: 'smooth'
				});
			})
		},
	}
}