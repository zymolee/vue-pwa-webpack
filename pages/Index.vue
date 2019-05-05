<template>
	<div class="cosmos-page">
		<button @click='changeCamera' class="change-button">change</button>
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

let camera, scene, renderer, controls,
		mesh, sun_mesh, mesh_Mercury, mesh_Venus,
		mesh_Earth, mesh_mars, mesh_Jupiter,
		mesh_saturn, mesh_neptune, mesh_pluto;

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
			a:'',
			length: 30,
			times:0,
			cameraIndex:0,
			cameralist:[
				[0,0,0],// sun
				[0,3500,0], // top
				[0,500,1500], // front-top
				[0,0,3500], // front
				[0,0,508], // Mercury
				[0,0,804], // Venus
				[0,0,1112], // Earth
				[0,0,1342], // Mars
				[0,0,1662], // Jupiter
				[0,0,2062], // Staurn
				[0,0,2392], // Neptune
				[0,0,2671], // Pluto
			],
		};
	},
	mounted: function() {
		this.init();
		this.animate()
	},
	methods: {
		changeCamera:function(){
			const {cameralist} = this;
			const num = this.cameraIndex + 1;
			camera.position.set(cameralist[num][0],cameralist[num][1],cameralist[num][2]);
			// renderer.render( scene, camera );
			if (this.cameraIndex === 10) {
				this.cameraIndex = 0;
				return;
			}
			this.cameraIndex += 1;
		},
		go3d: function () {
			if (window.location.pathname.indexOf('pwa_three_show')>=0) {
				window.location.href="/pwa_three_show/Cosmos/";
				return;
			}
			window.location.href="/Cosmos/";
		},
		init: function() {
			camera = new THREE.PerspectiveCamera(
				90, // 相机视角的夹角
				window.innerWidth / window.innerHeight, // 相机画幅比
				100, // 最近焦距
				10000 // 最远焦距 
			);
			camera.position.set(0,0,0)//set(x,y,z);
			// camera.lookAt(0,0,0);
			// camera.target = new THREE.Vector3(0, 0, 0); // 设置相机的观察位置，通常在球心

			controls = new THREE.DeviceOrientationControls( camera );// 添加设备陀螺仪控制
			scene = new THREE.Scene(); // 创建场景
			let geometry = new THREE.SphereBufferGeometry( 5000, 40, 40 ); // 创建球形几何图形用以建立VR视图结构
			let material = new THREE.MeshBasicMaterial( { // 添加贴图素材
				side:THREE.BackSide,// 渲染面片反面，向内渲染
				map: new THREE.TextureLoader().load( `./static/img/cosmos/sky.jpg`),
				// color: 0xff00ff,
			 //  wireframe: true 
			} );
			mesh = new THREE.Mesh( geometry, material ); // 拼接贴图与几何图形
			scene.add( mesh ); // 将贴图后的图形加入场景

			let sun_ball = new THREE.SphereBufferGeometry( 300, 40, 40 ); // 太阳
			let sun_material = new THREE.MeshBasicMaterial( { 
				map: new THREE.TextureLoader().load( `./static/img/cosmos/sunmap.jpg`),
			} );
			sun_mesh = new THREE.Mesh( sun_ball, sun_material );
			scene.add( sun_mesh );

			mesh_Mercury = this.creatPlanet( 8, 40, 40, `mercurymap.jpg`);
			mesh_Mercury.receiveShadow = true;  // 接收其他物体投射过来的阴影
			mesh_Mercury.castShadow = true; // 投射阴影到其他物体上
			mesh_Mercury.position.set(0,0,-508);
			scene.add( mesh_Mercury );

			mesh_Venus = this.creatPlanet( 88, 40, 40, `mercurymap.jpg`);
			mesh_Venus.receiveShadow = true;  
			mesh_Venus.castShadow = true;
			mesh_Venus.position.set(0,0,-804);
			scene.add( mesh_Venus );
			
			mesh_Earth = this.creatPlanet( 20, 40, 40, `earthmap1k.jpg`);
			mesh_Earth.receiveShadow = true;  
			mesh_Earth.castShadow = true;
			mesh_Earth.position.set(0,0,-1112);
			scene.add( mesh_Earth );

			mesh_mars = this.creatPlanet( 10, 40, 40, `mars_1k_color.jpg`);
			mesh_mars.receiveShadow = true;  
			mesh_mars.castShadow = true;
			mesh_mars.position.set(0,0,-1342);
			scene.add( mesh_mars );


			mesh_Jupiter = this.creatPlanet( 110, 40, 40, `jupiter.jpg`);
			mesh_Jupiter.receiveShadow = true;  
			mesh_Jupiter.castShadow = true;
			mesh_Jupiter.position.set(0,0,-1662);
			scene.add( mesh_Jupiter );

			mesh_saturn = this.creatPlanet( 90, 40, 40, `saturnmap.jpg`);
			mesh_saturn.receiveShadow = true;  
			mesh_saturn.castShadow = true;
			mesh_saturn.position.set(0,0,-2062);
			scene.add( mesh_saturn );

			mesh_neptune = this.creatPlanet( 40, 40, 40, `neptunemap.jpg`);
			mesh_neptune.receiveShadow = true;  
			mesh_neptune.castShadow = true;
			mesh_neptune.position.set(0,0,-2392);
			scene.add( mesh_neptune );

			mesh_pluto = this.creatPlanet( 39, 40, 40, `plutomap1k.jpg`);
			mesh_pluto.receiveShadow = true;  
			mesh_pluto.castShadow = true;
			mesh_pluto.position.set(0,0,-2671);
			scene.add( mesh_pluto );

			var light = new THREE.PointLight(
				0xfbfbf0, // 光的颜色 -> 十六进制
				2, // 亮度
				10000 // 光源最远照射距离
			);
			light.position.set(0, 0, 0);
			// light.castShadow = true; // 允许灯光投射阴影
			scene.add(light);
			var env_light = new THREE.AmbientLight(0x141414);
			scene.add(env_light);
			//
			renderer = new THREE.WebGLRenderer( { antialias: true } );
			renderer.shadowMapEnabled = true;  //允许阴影投射
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight ); // 定义尺寸
			document.getElementById('cosmos').appendChild( renderer.domElement ); // 将场景到加入页面中
			//
		},
		animate: function() {
			controls.update();
			this.setmesh();
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
			renderer.render( scene, camera );
			window.requestAnimationFrame( this.animate );
		},
		setmesh: function() {
			this.times += 1;
			mesh.rotation.x += Math.random()*(Math.random>0.5?1:-1)/1800;
  		mesh.rotation.y += Math.random()*(Math.random>0.5?1:-1)/1800;
  		mesh.rotation.z += Math.random()*(Math.random>0.5?1:-1)/1800;

			sun_mesh.rotation.x += Math.random()*(Math.random>0.5?1:-1)/500;
  		sun_mesh.rotation.y += Math.random()*(Math.random>0.5?1:-1)/500;
  		sun_mesh.rotation.z += Math.random()*(Math.random>0.5?1:-1)/500;

      mesh_Mercury.position.x=Math.sin(0.144*this.times)*508;
      mesh_Mercury.position.z=Math.cos(0.144*this.times)*508;
  		mesh_Mercury.rotation.y = 0.000614*this.times;

			mesh_Venus.position.x=Math.sin(0.0537*this.times)*804;
      mesh_Venus.position.z=Math.cos(0.0537*this.times)*804;
  		mesh_Venus.rotation.y = 0.000148*this.times;

  		mesh_Earth.position.x=Math.sin(0.036*this.times)*1112;
      mesh_Earth.position.z=Math.cos(0.036*this.times)*1112;
  		mesh_Earth.rotation.y = 0.036*this.times;

  		mesh_mars.position.x=Math.sin(0.0191*this.times)*1342;
      mesh_mars.position.z=Math.cos(0.0191*this.times)*1342;
  		mesh_mars.rotation.y = 0.0349*this.times;

  		mesh_Jupiter.position.x=Math.sin(0.003*this.times)*1662;
      mesh_Jupiter.position.z=Math.cos(0.003*this.times)*1662;
  		mesh_Jupiter.rotation.y = 0.0878*this.times;
  		
  		mesh_saturn.position.x=Math.sin(0.0012*this.times)*2062;
      mesh_saturn.position.z=Math.cos(0.0012*this.times)*2062;
  		mesh_saturn.rotation.y = 0.08*this.times;
  		
  		mesh_neptune.position.x=Math.sin(0.004*this.times)*2392;
      mesh_neptune.position.z=Math.cos(0.004*this.times)*2392;
  		mesh_neptune.rotation.y = 0.05*this.times;

  		mesh_pluto.position.x=Math.sin(0.0002*this.times)*2671;
      mesh_pluto.position.z=Math.cos(0.0002*this.times)*2671;
  		mesh_pluto.rotation.y = 0.0537*this.times;
  		
		},
		creatPlanet: function(a,b,c,d){
			let geometry = new THREE.SphereBufferGeometry( a, b, c ); 
			let material = new THREE.MeshLambertMaterial({
			  map: new THREE.TextureLoader().load(`./static/img/cosmos/${d}`),
			});
			return new THREE.Mesh( geometry, material );
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
	position:relative;
	.change-button{
		position:absolute;
		right:0;
		bottom:0;
		padding: 21px;
		background:rgba(255,255,255,.2);
	}
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
