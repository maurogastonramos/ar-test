<template>
  <div class="" @mouseover="showTooltip=true" @mouseleave="showTooltip=false">
    <!-- Ícono -->
    <slot name="icon" class="group"></slot>

    <div class="flex relative">
      <!-- Tooltip -->
      <div :class="[{
        'top-full': !invertY, 'bottom-full': invertY, '-right-[100%]': centerX &&
          !invertX, 'right-full': !centerX && !invertX, 'left-full': invertX,
          'hidden': !showTooltip
      }, 'p-2 absolute rounded border border-black bg-gray-50 z-50 w-max']">
        <span class="text-xs">
          <slot name="content"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';


export default {
  components: {
  },
  props: {
    invertY: {
      type: Boolean,
      required: false,
      default: false
    },
    invertX: {
      type: Boolean,
      required: false,
      default: false
    },
    centerX: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(){
    let showTooltip = ref(false);

    return {showTooltip}
  }
};
</script>