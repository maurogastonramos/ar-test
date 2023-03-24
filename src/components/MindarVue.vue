<script setup>
import { nextTick } from "process";
import { ref } from "vue";

function getTarget() {
  return new URL(`@/assets/targets.mind`, import.meta.url).href;
}

function getModel() {
  return new URL(`@/assets/scene.gltf`, import.meta.url).href;
}
function getBallonModel(){
    return new URL(`@/assets/ballons/scene.gltf`, import.meta.url).href;
}
</script>

<template>
  <a-scene
    ref="sceneRef"
    :mindar-image="`imageTargetSrc: ${getTarget()}; uiLoading: no; uiError: no; uiScanning: no;`"
    color-space="sRGB"
    embedded
    renderer="colorManagement: true, physicallyCorrectLights"
    vr-mode-ui="enabled: false"
    device-orientation-permission-ui="enabled: false"
  >
    <a-assets>
      <img
        id="card"
        src="https://scontent.feze13-1.fna.fbcdn.net/v/t39.30808-6/337174931_179116448243413_6888041579702755901_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=4fLXPy09BYkAX_GEeJV&_nc_ht=scontent.feze13-1.fna&oh=00_AfCVxhacDg89QslGwqrZwz93_PSA7V-YyJTifkMSFO2wfA&oe=6423EBC3"
        crossorigin="anonymous"
      />
      <a-asset-item
        id="avatarModel"
        :src="getModel()"
        crossorigin
      ></a-asset-item>
      <a-asset-item
        id="avatarModel2"
        :src="getBallonModel()"
        crossorigin
      ></a-asset-item>
    </a-assets>

    <a-camera
      position="0 0 0"
      look-controls="enabled: false"
      camera=""
      rotation=""
      wasd-controls=""
    ></a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <a-plane
        src="#card"
        position="0 0 0"
        height="1"
        width="1"
        rotation="0 0 0"
      ></a-plane>
      <a-entity id="parent" position="0 -0.4 0">
        <a-gltf-model
          rotation="0 0 0 "
          position="-0.5 0.2 0"
          scale="0.0005 0.0005 0.0005"
          src="#avatarModel"
          animation="property: position; to: -0.5 0 0; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>
        
        <!-- Right Heart -->
        <a-gltf-model
          rotation="0 0 0 "
          position="0.5 0.2 0"
          scale="0.0005 0.0005 0.0005"
          src="#avatarModel"
          animation="property: position; to: 0.5 0 0; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>

      
<a-entity text="value:¡Feliz mes!; color:black; anchor:center;wrap-count:7; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/dancingscript/DancingScript-Regular.json;" position="0 0.0 0" ></a-entity>     



      </a-entity>

            
              <!-- center Heart -->
        <a-gltf-model
          rotation="0 0 0 "
          position="0 -0.5 0.1"
          scale="0.0009 0.0009 0.0009"
          src="#avatarModel"
animation="property: rotation; to: 0 360 0; dur: 1500; easing: linear; loop: true;"
        ></a-gltf-model>
    </a-entity>
  </a-scene>
</template>

<style>
a-scene {
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
}
video {
  height: 100% !important;
  width: 100%;
  left: unset !important;
}
</style>
