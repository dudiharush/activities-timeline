<template>
  <div class="activity-icon" :class="{ 'jr-icon': isJr }">
    <div class="jr-tag">Jr.</div>
    <img
      :src="require(`../assets/topics/${iconFileName}`)"
      :style="{
        display: 'block',
        'margin-left': 'auto',
        'margin-right': 'auto',
        width: '100%',
      }"
    />
  </div>
</template>

<script>
export default {
  props: ["isJr", "iconFileName"],
};
</script>

<style scoped>
.jr-icon .jr-tag {
  display: flex;
}

.jr-tag {
  width: 15px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 8px;
  aspect-ratio: 1;
  background-color: #ffc45c;
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  font-style: italic;
}
</style>
