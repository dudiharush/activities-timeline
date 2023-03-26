<template>
  <div :style="{ 'text-align': 'left' }">
    <ActivitySeparator v-if="showSeparator" />
    <div class="month-name-container">
      {{ monthName }}
    </div>
  </div>
</template>

<script>
import ActivitySeparator from "./ActivitySeparator.vue";

export default {
  components: {
    ActivitySeparator,
  },
  props: ["monthName", "showSeparator"],
};
</script>

<style scoped>
.month-name-container {
  text-align: center;
  padding: 4px;
  font-size: 12px;
  width: 80px;
  border-radius: 20px;
  background-color: #fcf7e1;
}
</style>