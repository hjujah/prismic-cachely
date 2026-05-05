<script setup>
  const route = useRoute()

  // Define component props
  const props = defineProps({
    field: {
      type: String,
      default: "field"
    },
    filterFields: {
      type: Array,
      default: () => []
    },
    collection: {
      type: Array,
      default: () => []
    },

    options: {
      type: [Array, Boolean],
      default: false
    },

    colorList: {
      type: Object
    },
    multiple: {
      type: Boolean,
      default: false
    },
    singleFilterOnly: {
      type: Boolean,
      default: false
    },
    removeOtherOptions: {
      type: Boolean,
      default: false
    },
    preventRemovingAttribute: {
      type: Boolean,
      default: false
    },
    showField: {
      type: Boolean,
      default: false
    },
    urlPrefix: {
      type: String
    },
    showAll: {
      type: Boolean,
      default: true
    },
    allText: {
      type: String,
      default: "All"
    },
    allUrl: {
      type: String
    },
    // used to set the widht of the filter box ie: (basis-1/5)
    itemClass: {
      type: String,
      default: "-ml-px"
    },
    allClass: {
      type: String
    },
    fieldPrefix: {
      type: String,
      default: "data."
    },
    filterWrapperClass: {
      type: String
    },
    hideActive: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "normal",
      validator(value, props) {
        return ["normal", "wider"].includes(value)
      }
    }
  })

  const {
    filterOptions,
    selectedOptions,
    enabledOptions,
    noFiltersSelected,
    getFilterUrl,
    isActive,
    isLink
  } = useFilters({
    options: props.options,
    field: props.field,
    collection: props.collection,
    filterFields: props.filterFields,
    multiple: props.multiple,
    singleFilterOnly: props.singleFilterOnly,
    removeOtherOptions: props.removeOtherOptions,
    preventRemovingAttribute: props.preventRemovingAttribute,
    urlPrefix: props.urlPrefix,
    fieldPrefix: props.fieldPrefix
  })

  const emit = defineEmits(["update:selectedOptions", "onClick", "change"])
  watch(selectedOptions, (val) => {
    emit("update:selectedOptions", val)
    emit("change", val)
  })

  onMounted(() => {
    emit("update:selectedOptions", selectedOptions.value)

    // console.log("predefined options:", props.filterOptions)
  })

  const get_component = (option) => {
    return isLink(option) ? defineNuxtLink({}) : "div"
  }

  const selectedColor = computed(() =>
    colorThemes[props.color] ? colorThemes[props.color] : defaultColor
  )
</script>

<template>
  <section
    @click="emit('onClick')"
    class="links-filter text-black">
    <!-- Display field name if showField prop is true -->
    <p
      v-if="showField"
      v-html="field" />

    <ol
      :class="filterWrapperClass"
      class="filter-wrapper row">
      <!-- ALL -->
      <li
        :class="[itemClass, allClass]"
        v-if="showAll">
        <!-- Use Nuxt link to generate URLs -->
        <nuxt-link
          class="all-title"
          :to="allUrl || getFilterUrl(null)"
          :class="{
            active: noFiltersSelected
          }">
          <!-- Use prop to set default text for all option -->
          <span v-html="allText" />
        </nuxt-link>
      </li>
      <!-- END :: ALL -->

      <!-- OPTIONS -->
      <li
        v-for="(option, index) in filterOptions"
        :class="[
          itemClass,
          {
            hidden: hideActive && isActive(option)
          },
          'flex'
        ]"
        :key="index">
        <component
          :is="get_component(option)"
          class="option-title relative flex-grow"
          :class="[
            {
              disabled: !isLink(option),
              active: isActive(option),
              selected: route.query
            },
            size
          ]"
          :to="getFilterUrl(option)">
          <p
            v-if="colorList"
            :style="`background-color`"
            :class="`list-dot bg-${colorList[option]}`" />

          <span
            :active="isActive(option)"
            v-html="option" />
        </component>
      </li>
      <!-- END :: OPTIONS -->
    </ol>
  </section>
</template>

<style lang="scss" scoped>
  .links-filter {
    .filter-wrapper {
      border-radius: 15px;
      background-color: theme("colors.white");

      @apply p-2;

      .all-title {
        border-radius: 27px;
        display: block;

        @apply px-4 py-2;

        &.active {
          background-color: theme("colors.white");
        }
      }

      .option-title {
        border-radius: 27px;
        transition: background-color 0.4s;

        @apply ps-5 pe-3 py-2;

        &.wider {
          @apply ps-5 pe-3 py-2;
        }

        &.normal {
          @apply px-4 py-2 my-0.5;
        }

        &.active {
          background-color: theme("colors.white") !important;
        }

        &.disabled {
          @apply opacity-20;
        }

        @media (hover: hover) {
          &:hover {
            background-color: theme("colors.white");
          }
        }
      }

      .list-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 100%;
        position: absolute;
        left: 0.35rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
