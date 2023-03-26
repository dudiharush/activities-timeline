<template>
  <div class="score-element" :v-show="hasScore">
    Score<b class="score-numbers">{{ score }}</b
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

.score-numbers {
  padding-inline-start: 4px;
}
</style>