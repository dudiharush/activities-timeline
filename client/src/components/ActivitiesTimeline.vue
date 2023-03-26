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
    <Activity
      v-for="activity in paginatedActivities"
      :key="activity.id"
      :activity="activity"
      @hide-activity-clicked="hideActivity"
    >
    </Activity>
    <div class="load-more" v-if="canLoadMore" @click="loadMoreActivities">
      <ChevronDownIcon />
      <div>Load more</div>
    </div>
  </div>
</template>

<script>
import FilterByType from "./FilterByType.vue";
import AutoCompleteInput from "./AutoCompleteInput.vue";
import Activity from "./Activity.vue";
import ChevronDownIcon from "./ChevronDownIcon.vue";

import { formatActivity } from "../utils.js";
const PAGE_SIZE = 10;

export default {
  components: {
    FilterByType,
    AutoCompleteInput,
    Activity,
    ChevronDownIcon,
  },
  props: {
    activityList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedActivityTypes: [],
      filterText: "",
      hiddenActivityIds: [],
      currentPage: 1,
    };
  },
  computed: {
    displayedActivitiesCount() {
      return PAGE_SIZE * this.currentPage;
    },
    paginatedActivities() {
      if (this.filteredActivities.length === 0) return [];

      const slicedActivities = this.filteredActivities.slice(
        0,
        this.displayedActivitiesCount
      );
      let activitiesMonth;
      let activitiesWithMonthStartFlag = slicedActivities.map((activity) => {
        const activityMonth = activity.date.getMonth();
        if (activitiesMonth !== activityMonth) {
          activitiesMonth = activityMonth;
          return { ...activity, isFirstActivityInMonth: true };
        }
        return activity;
      });
      activitiesWithMonthStartFlag[0].isFirstActivity = true;
      debugger;
      return activitiesWithMonthStartFlag;
    },
    canLoadMore() {
      return this.displayedActivitiesCount < this.activityList.length;
    },
    filteredActivities() {
      const filteredActivities = this.sortedActivities.filter((activity) => {
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

      return filteredActivities;
    },
    topicNames() {
      const topicNames = new Set();
      this.activityList.forEach((activity) => {
        topicNames.add(activity.topic_data.name);
      });
      return [...topicNames];
    },
    sortedActivities() {
      let sortedActivities = [...this.activityList].sort(
        (a, b) => a.d_created - b.d_created
      );
      const formattedActivities = sortedActivities.map(formatActivity);
      return formattedActivities;
    },
  },
  methods: {
    selectFilter(selectedActivityType) {
      if (this.selectedActivityTypes.includes(selectedActivityType)) {
        this.selectedActivityTypes = this.selectedActivityTypes.filter(
          (activityType) => activityType !== selectedActivityType
        );
      } else {
        this.selectedActivityTypes.push(selectedActivityType);
      }
    },
    loadMoreActivities() {
      this.currentPage++;
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
    this.loadHiddenActivityIds();
  },
};
</script>

<style scoped>
.load-more {
  color: #008081;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  justify-content: center;
}
</style>
