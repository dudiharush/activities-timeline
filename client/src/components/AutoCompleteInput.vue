<template>
  <div class="auto-complete-container">
    <div class="input-container">
      <input
        placeholder="Search timeline"
        type="text"
        :value="selectedVal"
        @input="handleChange"
        @onKeyUp="handler"
      />
      <div
        :style="{
          border: '1px solid grey',
          'background-color': '#008081',
          height: '24px',
          'aspect-ratio': 1,
        }"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15px"
          height="15x"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g id="Interface / Search_Magnifying_Glass">
            <path
              id="Vector"
              d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>

    <div
      class="options-list"
      v-show="showOptionsList && hasOptions"
      v-clickoutside="hideOptionsList"
    >
      <div
        v-for="(option, idx) in filteredOptions"
        :key="'' + option + idx"
        @click="onOptionSelected(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: ["options"],
  data() {
    return {
      showOptionsList: true,
      selectedVal: "",
    };
  },
  methods: {
    handleChange(e) {
      const input = e.target.value;
      this.selectedVal = input;
      this.showOptionsList = true;

      if (input === "") {
        this.$emit("onOptionSelected", input);
      }
    },
    hideOptionsList() {
      this.showOptionsList = false;
    },
    handler(e) {
      this.selectedVal = e.target.value;
    },
    onOptionSelected(value) {
      this.$emit("onOptionSelected", value);
      this.selectedVal = value;
      this.showOptionsList = false;
    },
  },
  computed: {
    filteredOptions() {
      const res = this.options.filter((i) => i.startsWith(this.selectedVal));
      return res;
    },
    hasOptions() {
      return this.filteredOptions.length > 0;
    },
  },
};
</script>
  
  <style scoped>
.auto-complete-container {
  display: block;
  border-radius: 7px;
  position: relative;
  transition: background 0.3s ease;
  width: 300px;
  height: 30px;
  padding-bottom: 20px;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.input-container input {
  border: 0;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
  outline: none;
}

.options-list {
  position: absolute;
  left: 0px;
  z-index: 999;
  cursor: pointer;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  border: 1px solid grey;
  max-height: 300px;
}

.options-list > div {
  padding: 5px;
  transition: all 0.1s ease;
  text-align: start;
}

.options-list > div:hover {
  background-color: #dbdbdb;
  color: #000000;
}

.options-list > div {
  font-size: 14px;
  background-color: white;
}

.input-container {
  background-color: white;
  border: 1px solid grey;
}
</style>
  