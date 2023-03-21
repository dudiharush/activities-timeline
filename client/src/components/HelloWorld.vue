<template>
  <div :style="{ margin: 'auto', width: '60%' }">
    <ActivityGroup
      v-for="(activityGroup, key, index) in activityGroupsByMonth"
      :activityGroup="activityGroup"
      :index="index"
      :key="key"
    >
    </ActivityGroup>
  </div>
</template>

<script>
import ActivityGroup from "./ActivityGroup.vue";
import { formatActivity } from "../utils.js";

export default {
  components: {
    ActivityGroup,
  },
  name: "HelloWorld",
  data() {
    return {
      listItems: [],
    };
  },
  computed: {
    activityGroupsByMonth: function () {
      const groups = this.listItems.reduce((group, item) => {
        const date = new Date(0);
        date.setUTCSeconds(item.d_created);
        const month = date.getMonth();
        group[month] = group[month] || {
          name: date.toLocaleString("en-us", { month: "short" }),
          activities: [],
        };
        const formattedActivity = formatActivity(item);
        group[month].activities.push(formattedActivity);
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
