<script setup>
import { ref, onMounted } from "vue";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";
// import {MindARThree} from 'mind-ar/dist/mindar-face-three.prod.js';

import MindarViewer from "@/components/MindarVue.vue";

</script>

<template>
  <mindar-viewer ref="mindarViewerRef" @ready="handleARSystems()"/>
</template>

<style>
html,
body,
#app {
  height: 100%;
}
body {
  background: black;
}
</style>
