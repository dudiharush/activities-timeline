<template>
  <div
    :style="{
      display: 'flex',
      color: '#6C6D6E',
      'font-size': '10px',
      gap: '4px',
    }"
  >
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
