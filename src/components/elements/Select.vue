<script>
import { computed, defineComponent, nextTick, ref, toRef } from "vue";

export default defineComponent({
  emits: ["update:selected", "changeSearchTerm"],
  props: {
    options: {
      type: Array,
      required: true,
      validator: function (value) {
        return value.every((v) => {
          return (v.value || v.value == 0) && v.text;
        });
      },
      default: () => []
    },
    selected: {
      type: [String, Number, null],
      required: true,
    },
    canSearch: {
      type: Boolean,
      required: false,
      default: true,
    },
    canAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      required: false,
      default: false,
    },
    required: {
      type: Boolean,
      required: false,
      default: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    },
    noResultsText: {
      type: String,
      required: false,
      default: null
    },
    innerSearch: {
      type: Boolean,
      required: false,
      default: true
    },
    minSearchLength: {
      type: Number,
      required: false,
      default: 0
    },
    canDisable: {
      type: Boolean,
      required: false,
      default: false
    },
    textOptionDisable: {
      type: String,
      required: false,
      default: ""
    },
    canNew: {
      type: Boolean,
      required: false,
      default: false
    },
    newText: {
      type: String,
      required: false,
      default: 'Nuevo'
    }
  },
  setup(props, { emit }) {
    let searchBy = ref("");
    let open = ref(false);
    let disabled = toRef(props, "disabled");
    let innerSearch = toRef(props, "innerSearch");
    let minSearchLength = toRef(props, "minSearchLength");
    let canDisable = toRef(props, "canDisable");


    const optionsComp = computed(() => {
      let options = props.options;
      if (searchBy.value?.length < minSearchLength.value) {
        return []
      }
      if (searchBy.value && innerSearch.value) {
        options = options.filter((o) => {
          let regex = new RegExp(`${searchBy.value.replace(/\s/g, "").toLowerCase()}`);
          let opcion = o.text ? o.text.replace(/\s/g, "").toLowerCase() : o.text;
          return regex.test(opcion);
        });
      }
      return options;
    });

    const widthValue = () => {
      return props.fullWidth
        ? "width: 100%"
        : props.canSearch
          ? "width: 8rem"
          : "width:4rem";
    };

    const clickOption = (value, disable) => {
      if (canDisable.value && disable) {
        return false;
      }
      open.value = false;
      emit("update:selected", value);
    };

    let inputBusqueda = ref(null);
    const openSelect = () => {
      if (!disabled.value) {
        open.value = !open.value;
      }

      // Autofocus al input de búsqueda
      nextTick(() => {
        if (inputBusqueda.value) {
          inputBusqueda.value.focus();
        }
      });
    };

    const deleteSearchBy = () => {
      searchBy.value = '';
      emit('changeSearchTerm', '');
    }
    return { searchBy, optionsComp, open, clickOption, widthValue, openSelect, inputBusqueda, deleteSearchBy };
  },
});
</script>

<template>
  <div class="h-full">
    <div class="flex flex-col items-center text-left w-full h-full">
      <!-- Overlay de cierre -->
      <div v-if="open" class="z-10 absolute top-0 bottom-0 left-0 right-0" @click="openSelect" />
      <div class="w-full h-full">
        <div class="flex flex-col items-center relative">
          <!-- Select -->
          <div class="w-full z-10 cursor-pointer group" @click="openSelect">
            <div :class="[
              'flex items-center border border-gray-200 group-hover:border-gray-400 transition duration-300 bg-white rounded-t',
              { 'bg-gray-50': disabled },
              { 'rounded-b': !open }
            ]">
              <!-- Opción seleccionada -->
              <div class="flex-1 pr-3 truncate">
                <input v-if="(selected !== null && selected !== undefined) || !canAll" :value="
                  (selected !== null && selected !== undefined)
                    ? (selected == -9999 ? newText : options.find((o) => o.value == selected)?.text)
                    : null
                " class="pl-2 border-0 outline-none ring-0 bg-transparent w-full placeholder:text-gray-300 cursor-pointer inputPreview  wegolf-input"
                  :placeholder="placeholder" :required="required" data-readonly onkeypress="return false;" />
                <span class="pl-2" v-else-if="canAll">Todos</span>
              </div>

              <!-- Flecha -->
              <div class="text-gray-300 w-5 border-l flex items-center border-gray-200">
                <button :class="[
                  { 'rotate-180': !open },
                  'transform flex justify-center items-center cursor-pointer w-5 h-5 text-gray-600 outline-none focus:outline-none',
                ]" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-chevron-up w-4 h-4">
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Opciones -->
          <div v-show="open" class="z-99 w-auto absolute left-0 shadow top-full" style="min-width: 100%">
            <!-- Buscador -->
            <div v-if="canSearch" class="p-1 border-b border-r border-l bg-white w-full relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-400 mr-1" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd" />
              </svg>
              <input type="text" class="flex-1 w-full h-full border-none active:outline-none focus:outline-none"
                ref="inputBusqueda" autofocus placeholder="Buscar..." v-model="searchBy"
                @input="$emit('changeSearchTerm', searchBy)" />
              <div v-if="searchBy" @click="deleteSearchBy" class="hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-x cursor-pointer text-gray-400 hover:text-main rounded-full w-3 h-3 ml-2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </div>

            <!-- Listado -->
            <div
              class="max-h-56 shadow-xl bg-white border-b z-40 w-full rounded-b max-h-select overflow-y-auto select-none">
              <!-- No hay resultados -->
              <div v-if="optionsComp.length === 0 && searchBy?.length >= minSearchLength && !canNew"
                class="text-gray-500 p-2">{{
                noResultsText || "No hay resultados para mostrar."
                }}</div>

              <!-- Comience a tipear -->
              <div v-if="optionsComp.length === 0 && searchBy?.length < minSearchLength" class="text-gray-500 p-2">{{
              "Comience a tipear para iniciar la búsqueda"
              }}</div>

              <!-- Todos -->
              <div v-if="canAll && !searchBy" :class="[
                'flex flex-col w-full bg-white hover:bg-gray-200',
              ]" @click="clickOption(null)">
                <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-blue-50">
                  <div class="flex w-full items-center border-transparent border-l-2 relative hover:border-teal-100">
                    <div class="w-full items-center flex">
                      <div class="mx-2 leading-6">Todos</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Nuevo -->
              <div v-if="canNew" :class="[
                'bg-white hover:bg-blue-50 cursor-pointer flex flex-col w-full list'
              ]" @click="clickOption('-9999')">
                <div class="cursor-pointer w-full border-gray-100 border-b hover:bg-blue-50">
                  <div class="flex w-full items-center border-transparent border-l-2 relative">
                    <div class="w-full items-center flex">
                      <div class="mx-2 leading-6">{{ newText }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Row Opciones -->
              <div v-for="(opcion, index) in optionsComp" :key="index" :class="[
                { 'bg-gray-200 cursor-not-allowed': opcion.disable },
                { 'bg-white hover:bg-blue-50 cursor-pointer': !opcion.disable },
                'flex flex-col w-full list',
              ]" @click="clickOption(opcion.value, opcion.disable)" :title="opcion.disable ? textOptionDisable : ''">
                <div class="py-2  w-full border-gray-100 rounded-t border-b ">
                  <div class="flex w-full items-center border-transparent border-l-2 relative hover:border-blue-50">
                    <div class="w-full items-center flex">
                      <div class="mx-2 leading-4">{{ opcion.text }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
input.inputPreview {
  color: transparent;
  text-shadow: 0 0 0 black;
}

input.inputPreview:focus {
  outline: none;
}

.z-99 {
  z-index: 99;
}

input[data-readonly] {
  pointer-events: none;
}
</style>