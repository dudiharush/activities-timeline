<template>
  <div :style="{ margin: 'auto', width: '60%' }">
    <FilterByType
      @select-filter="selectFilter"
      :selectedActivityTypes="selectedActivityTypes"
    />
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
import FilterByType from "./FilterByType.vue";

import { formatActivity } from "../utils.js";

export default {
  components: {
    ActivityGroup,
    FilterByType,
  },
  name: "HelloWorld",
  data() {
    return {
      listItems: [],
      selectedActivityTypes: [],
    };
  },
  computed: {
    activityGroupsByMonth: function () {
      const groups = this.listItems.reduce((group, activity) => {
        if (
          this.selectedActivityTypes.length > 0 &&
          !this.selectedActivityTypes.includes(activity.resource_type)
        ) {
          return group;
        }
        const date = new Date(0);
        date.setUTCSeconds(activity.d_created);
        const month = date.getMonth();
        group[month] = group[month] || {
          name: date.toLocaleString("en-us", { month: "short" }),
          activities: [],
        };
        const formattedActivity = formatActivity(activity);
        group[month].activities.push(formattedActivity);
        return group;
      }, {});
      Object.values(groups).forEach((group) => {
        group.activities.sort((a, b) => {
          return a.d_created - b.d_created;
        });
      });
      return groups;
    },
  },
  methods: {
    async fetchActivities() {
      const res = await fetch("http://localhost:3000/activities/v1");
      const jsonRes = await res.json();
      this.listItems = jsonRes;
    },
    selectFilter(selectedActivityType) {
      if (this.selectedActivityTypes.includes(selectedActivityType)) {
        this.selectedActivityTypes = this.selectedActivityTypes.filter(
          (activityType) => activityType !== selectedActivityType
        );
      } else {
        this.selectedActivityTypes.push(selectedActivityType);
      }
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
