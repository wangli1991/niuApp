<template>
	<view>
		<uni-address-picker @conceal="conceal" :is-picker-show="popup" />
	</view>
</template>

<script>
	import 	UniAddressPicker from '@/components/uni-address-picker/uni-address-picker.vue';
	export default {
		components: {
			UniAddressPicker
		},
		data() {
			return {
				popup: true
			}
		},
		methods: {
			conceal(param) {
				// 获取到传过来的 省 市 区 县数据
				console.log(param);
				// 选择完毕后隐藏
				this.popup = false;

			}
		}
	}
</script>

<style>

</style>
