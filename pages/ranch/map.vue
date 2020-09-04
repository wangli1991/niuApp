<template>
	<view class="map">
		<map :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../static/location.png'
				}]
			}
		},
		mounted() {
			const query = this.$Route.query
			const {
				poi_name,
				poi_address,
				poi_latitude,
				poi_longitude
			} = query
			this.latitude=poi_latitude
			this.longitude=poi_longitude
			this.covers=[
				{
					latitude: poi_latitude,
					longitude: poi_longitude,
					iconPath: '../../static/location.png'
				}
			]
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.map{
		width: 100%;
		height: calc(100%);
		map {
			width: 100%;
			height: calc(100%);
		}
	}
</style>
