<script setup>
defineEmits(['goBack']);
</script>


<template>
    <div
        class="flex justify-start items-center gap-x-1 font-semibold select-none cursor-pointer group"
        @click="$emit('goBack')"
    >
        <div class="group-hover:text-main transition duration-300">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transform group-hover:-translate-x-0.5 transition duration-500"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd"
                />
            </svg>
        </div>
        <p class="text-xs font-family-montserrat"><slot></slot></p>
    </div>
</template>

