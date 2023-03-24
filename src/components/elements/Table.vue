<template>
  <div class="flex text-xs">
    <div v-if="withTotals" class="relative top-7 text-right px-2">
      <div v-for="(row, index) in tableRowsSort" :key="index" class="text-xs h-6">{{ row.label }}</div>
    </div>

    <div class="flex flex-1">
      <table class="text-xs w-full">
        <!-- Columnas -->
        <thead>
          <tr class="bg-white border rounded-t select-none">
            <th v-for="column in columns" :key="column.id" :class="[
              { 'from-yellow-100': isSortActive(column.id) },
              { 'from-yellow-100': !canSort },
              { 'cursor-pointer ': canSort },
              { 'from-gray-50': !isSortActive(column.id) && canSort },
              'p-1 font-bold bg-gradient-to-t to-white border-l border-r first:border-l-0 last:border-r-0',
            ]" @click="changeSortBy(column.id)">
              <div class="flex items-center gap-1">
                <span>{{ column.text }}</span>

                <!-- Iconos sort -->
                <div :class="[{ 'invisible': !isSortActive(column.id) }, 'relative top-0.5']">
                  <svg v-if="sortAsc" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <!-- Rows -->
        <tbody>
          <!-- <tr v-if="!loading" class="overflow-y-auto"> -->
          <tr v-for="(row, index) in tableRowsSort" :key="index"
            :class="[{
              '!bg-green-50': row.status_color == 'green',
              '!bg-yellow-50': row.status_color == 'yellow',
              '!bg-blue-50': row.status_color == 'blue',
              '!bg-white': row.status_color == 'white',
            },'h-6 even:bg-gray-50 odd:bg-white border border-gray-200 border-r-2 border-l-2 border-transparent hover:!bg-yellow-50 hover:border-r-2 hover:border-r-yellow-500 hover:border-l-2 hover:border-l-yellow-500 last:rounded-b-md relative']"
            @click="$emit('clickRow', row)">
            <td :class="[
              {'w-2': column.options?.includes('autowidth')},
              'pl-1 h-full text-left border-gray-200 border-l border-r first:border-l-0 last:border-r-0',
            ]" v-for="(column, colIndex) in columns" :key="column.id">

              <div v-if="colIndex == 0" class="w-full h-full absolute top-0 left-0">
                <slot :name="'edit'" :row="row"></slot>
              </div>

              <slot v-if="column.type === 'Special'" :name="column.id" :index="index" :row="row"></slot>
              <span v-else-if="column.type === 'Number'">{{ row[column.id] ? row[column.id] : "" }}</span>
              <span v-else-if="column.type === 'String'">{{ row[column.id] ? row[column.id] : "" }}</span>
              <span v-else-if="column.type === 'Array'">{{ row[column.id] ? row[column.id].join(', ') : "" }}</span>
              <span v-else-if="column.type === 'Date'">{{ row[column.id] ? row[column.id] : "" }}</span>
            </td>
          </tr>

          <!-- Sin resultados -->
          <tr v-if="!loading && tableRowsSort.length === 0" class="h-20 bg-white justify-center py-5">
            <td :colspan="columns.length">No hay resultados para mostrar.</td>
          </tr>
        </tbody>
        <div v-if="loading" class="w-full bg-white flex justify-center border py-5 text-main">
          <svg class="animate-spin h-20 w-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75 text-main-blue" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>

        <!-- Total por columnas -->
        <div v-if="withTotals" class="h-6 flex items-center w-full text-right font-bold">
          <div v-for="column in columnTotals" :key="column.id" class="flex-1 pr-1">{{ column }}</div>
        </div>
      </table>
    </div>

    <!-- Total por rows -->
    <div v-if="withTotals" class="relative top-7 pt-0.5 text-left px-2 font-bold text-xs">
      <div v-for="(row, index) in rowTotals" :key="index" class="h-6">{{ row }}</div>
      <div>{{ total }}</div>
    </div>
  </div>
</template>


<script>
import { computed, defineComponent, ref, toRef } from "vue";
import { parse, compareAsc } from "date-fns";

export default defineComponent({
  name: "VTable",
  props: {
    rows: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    canSort: {
      type: Boolean,
      required: false,
      default: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    withTotals: {
      type: Boolean,
      required: false,
      default: false,
    },
    fullTitle: {
      type: Boolean,
      required: false,
      default: false,
    },
    initialSortBy: {
      type: String,
      required: false,
      default: "id"
    },
    initialSortAsc: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ["clickRow"],
  setup(props) {
    let rows = toRef(props, "rows");
    let canSort = toRef(props, "canSort");
    // Configuración de tabla

    let columns = toRef(props, "columns");

    // Configuración Sort
    let sortBy = ref(toRef(props, "initialSortBy").value);
    let sortAsc = ref(toRef(props, "initialSortAsc").value);
    const tableRowsSort = computed(() => {
      if (canSort.value) {
        return [...rows.value].sort(sortRows);
      }
      {
        return [...rows.value];
      }
    });
    const sortRows = (a, b) => {
      const type = columns.value.find((c) => c.id === sortBy.value).type;

      a = a[sortBy.value]?.toString().trim().toLowerCase() || 0;
      b = b[sortBy.value]?.toString().trim().toLowerCase() || 0;
      let valA = sortAsc.value ? a : b;
      let valB = sortAsc.value ? b : a;

      if (type === "String") {
        return valA > valB ? 1 : -1;
      } else if (type === "Number") {
        return parseFloat(valA) - parseFloat(valB);
      } else if (type === "Date") {
        valA = parse(valA, "dd/MM/yyyy", new Date());
        valB = parse(valB, "dd/MM/yyyy", new Date());
        return compareAsc(valA, valB);
      }
    };
    const changeSortBy = (id) => {
      if (!canSort.value) {
        return;
      }

      if (sortBy.value === id) {
        sortAsc.value = !sortAsc.value;
      } else {
        sortAsc.value = false;
        sortBy.value = id;
      }
    };

    const isSortActive = (optionId) => {
      return optionId === sortBy.value;
    };

    const columnTotals = computed(() => {
      let obj = {};
      columns.value.forEach((column) => {
        if (!obj[column.id]) {
          obj[column.id] = 0;
        }
        obj[column.id] += tableRowsSort.value.reduce((acum, row) => {
          return (acum += row[column.id]);
        }, 0);
      });
      return obj;
    });

    const rowTotals = computed(() => {
      let obj = {};
      tableRowsSort.value.forEach((row) => {
        if (!obj[row.id]) {
          obj[row.id] = 0;
        }
        columns.value.forEach((column) => {
          obj[row.id] += parseInt(row[column.id]);
        });
      });
      return obj;
    });

    const total = computed(() => {
      let total = 0;
      total += Object.values(columnTotals.value).reduce((acum, column) => {
        return (acum += column);
      }, 0);

      return total;
    });

    return {
      tableRowsSort,
      changeSortBy,
      sortAsc,
      sortBy,
      isSortActive,
      columnTotals,
      rowTotals,
      total, parse
    };
  },
});
</script>