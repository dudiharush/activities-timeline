<template>
  <div>
    <ActivitiesMonth
      v-if="activity.isFirstActivityInMonth"
      :showSeparator="!activity.isFirstActivity"
      :monthName="activity.date.toLocaleString('en-us', { month: 'short' })"
    />
    <ActivitySeparator />
    <div
      :style="{
        border: '2px solid #C5C5C5',
        padding: '20px',
        display: 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'border-radius': '5px',
      }"
    >
      <div
        :style="{
          display: 'flex',
          gap: '5x',
          'align-items': 'center',
          gap: '10px',
        }"
      >
        <ActivityIcon
          :product="activity.product"
          :iconFileName="activity.iconFileName"
        />
        <div
          :style="{
            'flex-direction': 'column',
            display: 'flex',
            gap: '4px',
          }"
        >
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
          :style="{
            cursor: 'pointer',
          }"
          tooltip="hide"
        >
          <HideIcon />
        </div>
      </div>
      <div
        :style="{ display: 'flex', gap: '10px' }"
        class="activity-settings"
        :class="getActivityClasses(activity.resource_type)"
      >
        <ActivityScore
          :score="activity.score"
          :possibleScore="activity.possible_score"
        />
        <div class="zoom-element" @click="showModal = true">
          <div :style="{ display: 'flex', gap: '4px' }">
            <EyeIcon />
            <div :style="{ margin: 'auto' }">View work</div>
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
</style>