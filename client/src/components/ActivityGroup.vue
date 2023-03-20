<template>
  <div style="{ 'text-align': 'left' }">
    <div
      v-show="index > 0"
      :style="{ height: '15px', 'padding-inline-start': '50px' }"
    >
      <div
        :style="{
          'background-color': '#C5C5C5',
          height: '100%',
          width: '1px',
        }"
      />
    </div>
    <div
      :style="{
        'text-align': 'center',
        padding: '2px',
        width: '100px',
        'border-radius': '20px',
        'background-color': '#FCF7E1',
      }"
    >
      {{ monthName }}
    </div>
    <Activity
      v-for="activity in activities"
      :key="activity.id"
      :activity="activity"
    >
    </Activity>
  </div>
</template>

<script>
import Activity from "./Activity.vue";

export default {
  components: {
    Activity,
  },
  props: ["activities", "monthName", "index"],
};
</script>