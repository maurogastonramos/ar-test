<script setup>
import { ref, onMounted } from "vue";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
// import {MindARThree} from 'mind-ar/dist/mindar-face-three.prod.js';

import MindarViewer from "@/components/MindarVue.vue";

const mindarViewerRef = ref(null);
const title = ref("START");

function handleARSystems() {
  console.log("awsdasd");
  const sceneEl = mindarViewerRef.value.sceneRef;
  const arSystem = sceneEl.systems["mindar-image-system"];
  if (title.value == "START") {
    arSystem.start();
    title.value = "STOP";
  } else {
    arSystem.stop();
    title.value = "START";
  }
}
</script>

<template>
  <div class="app">
    <div style="height:10vh">
      <button @click="handleARSystems()">{{ title }}</button>
    </div>

    <div class="container">
      <mindar-viewer ref="mindarViewerRef" />
    </div>
  </div>
</template>

<style>
html,
body,

.app {
  text-align: center;
}
.container {
  margin: 0 auto;
  position: relative;
  height: 90vh;
  width: 600px;
  overflow: hidden;
}
</style>
