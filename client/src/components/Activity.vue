<template>
  <div>
    <ActivitiesMonth
      v-if="activity.isFirstActivityInMonth"
      :showSeparator="!activity.isFirstActivity"
      :monthName="activity.date.toLocaleString('en-us', { month: 'short' })"
    />
    <ActivitySeparator />
    <div class="activity-container">
      <div class="activity-info-container">
        <ActivityIcon
          :product="activity.product"
          :iconFileName="activity.iconFileName"
        />
        <div class="activity-name-and-time-container">
          <div
            :style="{
              'font-weight': 'bold',
              'text-align': 'start',
              'text-transform': 'capitalize',
            }"
          >
            {{ activity.topic_data.name }}
          </div>
          <ActivityTime
            :date="activity.formattedDate"
            :time="activity.formattedTime"
          />
        </div>
        <div
          @click="$emit('hide-activity-clicked', activity.id)"
          class="hide-activity"
        >
          <HideIcon />
        </div>
      </div>
      <div
        class="activity-settings"
        :class="getActivityClasses(activity.resource_type)"
      >
        <ActivityScore
          :score="activity.score"
          :possibleScore="activity.possible_score"
        />
        <div class="zoom-element" @click="showModal = true">
          <div class="view-work-container">
            <EyeIcon />
            <div class="view-work-label">View work</div>
          </div>
        </div>
      </div>
    </div>
    <ActivityModal
      v-show="showModal"
      @close-modal="showModal = false"
      :activity="activity"
    />
  </div>
</template>

<script>
import { getSettings } from "../activitySettingsMap";
import EyeIcon from "./EyeIcon.vue";
import HideIcon from "./HideIcon.vue";

import ActivityModal from "./ActivityModal.vue";
import ActivityTime from "./ActivityTime.vue";
import ActivityIcon from "./ActivityIcon.vue";
import ActivityScore from "./ActivityScore.vue";
import ActivitiesMonth from "./ActivitiesMonth.vue";
import ActivitySeparator from "./ActivitySeparator.vue";

export default {
  props: ["activity"],
  components: {
    EyeIcon,
    HideIcon,
    ActivityModal,
    ActivityTime,
    ActivityIcon,
    ActivityScore,
    ActivitiesMonth,
    ActivitySeparator,
  },

  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    getActivityClasses: function (type) {
      return getSettings(type);
    },
  },
};
</script>

<style scoped>
.activity-settings {
  color: #017575;
  align-items: center;
  display: flex;
  gap: 10px;
}
.activity-settings.score .score-element,
.activity-settings.zoom .zoom-element {
  display: flex;
  font-size: 12px;
}

.score-element,
.zoom-element {
  display: none;
}

.zoom-element {
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
}

.activity-container {
  border: 2px solid #c5c5c5;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
}

.activity-info-container {
  display: flex;
  gap: 5x;
  align-items: center;
  gap: 10px;
}

.activity-name-and-time-container {
  flex-direction: column;
  display: flex;
  gap: 4px;
}

.hide-activity {
  cursor: "pointer";
}

.view-work-container {
  display: flex;
  gap: 4px;
}

.view-work-label {
  margin: auto;
}
</style>