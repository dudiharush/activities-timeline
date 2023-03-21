<template>
  <div class="score-element" :v-show="hasScore">
    Score<b :style="{ 'padding-inline-start': '4px' }">{{ score }}</b
    >/<b>{{ possibleScore }}</b>
  </div>
</template>
  
  <script>
export default {
  props: ["score", "possibleScore", "hasScore"],
};
</script>
  
<style scoped>
.score-element {
  color: #017575;
}
</style>