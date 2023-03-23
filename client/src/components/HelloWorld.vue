<template>
  <div :style="{ margin: 'auto', width: '60%' }">
    <FilterByType
      @select-filter="selectFilter"
      :selectedActivityTypes="selectedActivityTypes"
    />
    <AutoCompleteInput
      :options="topicNames"
      @onOptionSelected="onTextFilterOptionSelected"
      v-model="filterText"
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
import AutoCompleteInput from "./AutoCompleteInput.vue";

import { formatActivity } from "../utils.js";

export default {
  components: {
    ActivityGroup,
    FilterByType,
    AutoCompleteInput,
  },
  name: "HelloWorld",
  data() {
    return {
      listItems: [],
      selectedActivityTypes: [],
      filterText: "",
    };
  },
  computed: {
    activityGroupsByMonth() {
      const groups = this.listItems.reduce((group, activity) => {
        if (
          (this.selectedActivityTypes.length > 0 &&
            !this.selectedActivityTypes.includes(activity.resource_type)) ||
          (this.filterText.length > 0 &&
            !activity.topic_data.name
              .toLowerCase()
              .includes(this.filterText.toLowerCase().trim()))
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
    topicNames() {
      const topicNames = new Set();
      this.listItems.forEach((activity) => {
        topicNames.add(activity.topic_data.name);
      });
      console.log(JSON.stringify([...topicNames]));
      return [...topicNames];
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
    onTextFilterOptionSelected(selection) {
      this.filterText = selection;
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
