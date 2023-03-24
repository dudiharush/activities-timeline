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
      v-for="(activityGroup, key, index) in filteredActivityGroups"
      :activityGroup="activityGroup"
      :index="index"
      :key="key"
      @hide-activity-clicked="hideActivity"
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
      hiddenActivityIds: [],
    };
  },
  computed: {
    filteredActivityGroups() {
      const filteredGroups = Object.entries(this.activityGroupsByMonth).reduce(
        (filteredGroups, [groupKey, group]) => {
          const filteredActivities = group.activities.filter((activity) => {
            return (
              !this.hiddenActivityIds.includes(activity.id) &&
              (this.selectedActivityTypes.length === 0 ||
                this.selectedActivityTypes.includes(activity.resource_type)) &&
              (this.filterText.length === 0 ||
                activity.topic_data.name
                  .toLowerCase()
                  .includes(this.filterText.toLowerCase().trim()))
            );
          });

          if (filteredActivities.length > 0) {
            filteredGroups[groupKey] = {
              ...group,
              activities: filteredActivities,
            };
          }

          return filteredGroups;
        },
        {}
      );

      return filteredGroups;
    },
    topicNames() {
      const topicNames = new Set();
      this.listItems.forEach((activity) => {
        topicNames.add(activity.topic_data.name);
      });
      return [...topicNames];
    },
    activityGroupsByMonth() {
      const groups = this.listItems.reduce((groups, activity) => {
        const date = new Date(0);
        date.setUTCSeconds(activity.d_created);
        const month = date.getMonth();
        groups[month] = groups[month] || {
          name: date.toLocaleString("en-us", { month: "short" }),
          activities: [],
        };
        const formattedActivity = formatActivity(activity);
        groups[month].activities.push(formattedActivity);
        return groups;
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
    onTextFilterOptionSelected(selection) {
      this.filterText = selection;
    },
    hideActivity(activityId) {
      this.hiddenActivityIds.push(activityId);
      this.saveHiddenActivityIds();
    },
    saveHiddenActivityIds() {
      localStorage.setItem(
        "hiddenActivityIds",
        JSON.stringify(this.hiddenActivityIds)
      );
    },
    loadHiddenActivityIds() {
      if (localStorage.getItem("hiddenActivityIds")) {
        try {
          this.hiddenActivityIds = JSON.parse(
            localStorage.getItem("hiddenActivityIds")
          );
        } catch (e) {
          localStorage.removeItem("hiddenActivityIds");
        }
      }
    },
  },
  mounted() {
    this.fetchActivities();
    this.loadHiddenActivityIds();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
