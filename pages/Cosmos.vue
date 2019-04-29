<template>
	<div class="cosmos-page">
		<div class="wraper" id="cosmos">
      <!-- <div id="container"></div> -->
		</div>
	</div>
</template>

<script>
import THREELib from "three-js";
import DeviceOrientationControls from '../core/js/controls/DeviceOrientationControls';

function setState(store) {

}
const THREE = THREELib();
			THREE.DeviceOrientationControls = DeviceOrientationControls(THREE);

let camera, scene, renderer, controls;

export default {
	name: 'index',
	metaInfo: {
		title: 'cosmos',
		titleTemplate: '%s - WoW',
		meta: [
			{name: 'keywords', content: 'cosmos'},
			{name: 'description', content: '基于 Vue 的 PWA 解决方案'}
		]
	},
	data() {
		return {
			a:''
		};
	},
	mounted: function() {
		this.init();
		this.animate()
	},
	methods: {
		init: function() {
			camera = new THREE.PerspectiveCamera(
				75, // 相机视角的夹角
				window.innerWidth / window.innerHeight, // 相机画幅比
				1, // 最近焦距
				1000 // 最远焦距 
			);
			// camera.target = new THREE.Vector3(0, 0, 0); // 设置相机的观察位置，通常在球心

			controls = new THREE.DeviceOrientationControls( camera );// 添加设备陀螺仪控制
			scene = new THREE.Scene(); // 创建场景
			let geometry = new THREE.SphereBufferGeometry( 500, 60, 40 ); // 创建球形几何图形用以建立VR视图结构
			geometry.scale( - 1, 1, 1 ); // 在贴图的时候，让像素点朝内（非常重要)
			let material = new THREE.MeshBasicMaterial( { // 添加贴图素材
				map: new THREE.TextureLoader().load( `../static/img/cosmos/sky.jpg`) 
			} );
			let mesh = new THREE.Mesh( geometry, material ); // 拼接贴图与几何图形
			scene.add( mesh ); // 将贴图后的图形加入场景
			//
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight ); // 定义尺寸
			document.getElementById('cosmos').appendChild( renderer.domElement ); // 将场景到加入页面中
			//
			window.addEventListener( 'resize', this.onWindowResize, false );// 监听视窗变化
		},
		animate: function() {
			controls.update();
			renderer.render( scene, camera );
			window.requestAnimationFrame( this.animate );
		},
		onWindowResize: function(){
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			console.log('111');
		},
	},
	async asyncData({store, route}) {
		setState(store);
	}
};
// <!-- normal -->
</script>

<style lang="stylus" scoped>

.cosmos-page{
	.wraper{
		background: #000;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content:center;
		align-items:center;
		#container{
			width: 100vw;
			height: 100vh;
		}
	}
}

</style>
