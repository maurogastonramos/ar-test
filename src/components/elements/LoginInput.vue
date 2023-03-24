<template>
  <input
    :type="type"
    :name="id"
    :id="id"
    :placeholder="placeholder"
    class="
      w-full
      py-2
      px-4
      border-b-2 border-gray-300
      focus:outline-none
      hover:border-main
      transition
      duration-300
    "
    @input="$emit('update:value', $event.target.value)"
  />
</template>

<script>
export default {
    emits: ['update:value'],
    props: {
        type:{
            type: String,
            required: false,
            default: "text"
        },
        id: {
            type: String,
            required: true
        },
        placeholder:{
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
    },
};
</script>

<style>
</style>