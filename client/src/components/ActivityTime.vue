<template>
  <div class="activity-time">
    <div>{{ date }}</div>
    <div>&#8226;</div>
    <div>{{ time }}</div>
  </div>
</template>

<script>
export default {
  props: ["date", "time"],
};
</script>

<style scoped>
.activity-time {
  display: flex;
  color: #6c6d6e;
  font-size: 10px;
  gap: 4px;
}
</style>
