<script setup>
import { nextTick } from "process";
import { ref } from "vue";

function getPhoto() {
  return new URL(`/assets/nosotros.jpg`, import.meta.url).href;
}

function getTarget() {
  return new URL(`@/assets/targets.mind`, import.meta.url).href;
}

function getModel() {
  return new URL(`/assets/redHeart/scene.gltf`, import.meta.url).href;
}
function getVioletHeart() {
  return new URL(`/assets/violetHeart/scene.gltf`, import.meta.url).href;
}
function getRoseHeart() {
  return new URL(`/assets/roseHeart/scene.gltf`, import.meta.url).href;
}
function getCherries() {
  return new URL(`/assets/cherries/scene.gltf`, import.meta.url).href;
}
function getSnoopy() {
  return new URL(`/assets/snoopy/scene.gltf`, import.meta.url).href;
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
        :src="getPhoto()"
        crossorigin="anonymous"
      />
      <a-asset-item id="redHeart" :src="getModel()" crossorigin></a-asset-item>
      <a-asset-item
        id="violetHeart"
        :src="getVioletHeart()"
        crossorigin
      ></a-asset-item>
      <a-asset-item
        id="roseHeart"
        :src="getRoseHeart()"
        crossorigin
      ></a-asset-item>
      <a-asset-item
        id="cherries"
        :src="getCherries()"
        crossorigin
      ></a-asset-item>
      <a-asset-item id="snoopy" :src="getSnoopy()" crossorigin></a-asset-item>
    </a-assets>

    <a-camera
      position="0 0 0"
      look-controls="enabled: false"
      camera=""
      rotation=""
      wasd-controls=""
    ></a-camera>

    <a-entity mindar-image-target="targetIndex: 0">
      <!-- Main Photo -->
      <!-- <a-plane
        src="#card"
        position="0 0 0"
        height="1"
        width="1.5"
        rotation="0 0 0"
      ></a-plane> -->
          
        <a-image src="#card" position="0 0 0"
        height="1" width="1"></a-image>
        


      <!-- TOP -->
      <a-entity id="cherries-container" rotation="0 0 30">
        <a-gltf-model
          rotation="90 0 0 "
          position="-0.1 0.4 0.15"
          scale="0.1 0.1 0.1"
          src="#cherries"
        ></a-gltf-model>
      </a-entity>
      <a-entity id="snoopy-container" rotation="0 0 -40">
        <a-gltf-model
          rotation="90 0 0"
          position="0.1 .5 0"
          scale="0.6 0.6 0.6"
          src="#snoopy"
                    animation="property: position; to: 0.1 .5 .1; dur: 500; easing: easeInOutQuad; loop: true; dir: alternate"

        ></a-gltf-model>
      </a-entity>

      <!-- BOTTOM -->
      <a-entity id="parent" position="0 -0.4 0.1">
        <!-- Left heart -->
        <a-gltf-model
          rotation="0 0 0 "
          position="-0.5 0 0.1"
          scale="0.0005 0.0005 0.0005"
          src="#redHeart"
          animation="property: position; to: -0.5 0.4 0.1; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>

        <!-- Right Heart -->
        <a-gltf-model
          rotation="0 0 0 "
          position="0.5 0.4 0.1"
          scale="0.0005 0.0005 0.0005"
          src="#redHeart"
          animation="property: position; to: 0.5 0 0.1; dur: 2000; easing: easeInOutQuad; loop: true; dir: alternate"
        ></a-gltf-model>

        <!-- Text -->
        <a-entity
          text="value:¡Feliz 1er mes!; color:white; anchor:center;wrap-count:10; shader: msdf; font:https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/dancingscript/DancingScript-Regular.json;"
          position="0.05 -0.05 0.05"
        ></a-entity>
      </a-entity>
        <a-plane color="black" height="0.3" width="1" position="0 -.36 0.01" opacity="0.5"></a-plane>

      <!-- center Heart -->
      <a-gltf-model
        rotation="0 0 0 "
        position="0 -0.5 0.1"
        scale="0.0009 0.0009 0.0009"
        src="#redHeart"
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
