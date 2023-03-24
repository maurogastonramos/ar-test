<template>
  <input type="text" class="border rounded" :value="value" :placeholder="placeholder" :disabled="disabled"
    :required="required" @keyup="keyUp" @focus="$event.target.select()" @blur="onBlur"
    @keypress="isNumberKey" />
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  emits: ["update:value", "v-blur"],
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      type: [Number, null, String],
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    canNull: {
      type: Boolean,
      required: false
    }
  },
  setup(props, { emit }) {

    let { canNull } = toRefs(props);

    function keyUp(event) {
      event = event || window.event;

      const defaultValue = canNull.value ? null : 1;
      let inputValue = event.target.value;
      let regexOnlyNumbersAndDot = /[^\d.]|\.(?=.*\.)/g;

      inputValue = inputValue.replace(regexOnlyNumbersAndDot, "");
      inputValue = inputValue || defaultValue;
      
      event.target.value = inputValue;
      emit("update:value", event.target.value);
      return true;
    };

    function onBlur(event){
      let inputValue = event.target.value;
      inputValue = inputValue ? parseFloat(inputValue) : inputValue;
      emit('v-blur', inputValue)
    }
    

    return { keyUp, onBlur };
  },
});
</script>
