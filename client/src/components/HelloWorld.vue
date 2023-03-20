<template>
  <div :style="{ margin: 'auto', width: '60%' }">
    <div
      v-for="(activities, monthName, index) in activitiesByMonth"
      v-bind:key="monthName"
      :style="{ 'text-align': 'left' }"
    >
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
  </div>
</template>

<script>
import Activity from "./Activity.vue";

export default {
  components: {
    Activity,
  },
  name: "HelloWorld",
  data() {
    return {
      listItems: [],
    };
  },
  computed: {
    activitiesByMonth: function () {
      const groups = this.listItems.reduce((group, item) => {
        const date = new Date(0);
        date.setUTCSeconds(item.d_created);
        const month = date.toLocaleString("en-us", { month: "short" });
        group[month] = group[month] || [];
        group[month].push({
          ...item,
          displayDate: date.toLocaleString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          displayTime: date.toLocaleTimeString([], { timeStyle: "short" }),
          iconFileName: item.topic_data.icon_path.split("/").at(-1),
        });
        return group;
      }, {});
      return groups;
    },
  },
  methods: {
    async fetchActivities() {
      const res = await fetch("http://localhost:3000/activities/v1");
      const jsonRes = await res.json();
      this.listItems = jsonRes;
    },
  },
  mounted() {
    this.fetchActivities();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
