<template>
  <div :style="{ display: 'flex', 'flex-direction': 'column', height: '100%' }">
    <div
      :style="{
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        gap: '10px',
      }"
    >
      <div>
        <ActivityIcon
          :product="activity.product"
          :iconFileName="activity.iconFileName"
        />
      </div>
      <div :style="{ 'font-size': '40px', color: 'black' }">
        {{ activity.topic_data.name }}
      </div>
      <ActivityTime :date="activity.displayDate" :time="activity.displayTime" />
    </div>
    <div class="activity-details">
      <div class="activity-comment">
        {{ activity.comment }}
      </div>
      <div v-if="hasScore(activity.resource_type)">
        <ActivityScore
          :score="activity.score"
          :possibleScore="activity.possible_score"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import CloseIcon from "./CloseIcon.vue";
import ActivityIcon from "./ActivityIcon.vue";
import ActivityTime from "./ActivityTime.vue";
import ActivityScore from "./ActivityScore.vue";
import { getSettings } from "../activitySettingsMap";

export default {
  props: ["activity"],
  components: {
    ActivityIcon,
    ActivityTime,
    ActivityScore,
  },
  methods: {
    hasScore: function (type) {
      return getSettings(type).score;
    },
  },
};
</script>

<style scoped>
.activity-icon {
  height: 50px;
}

.activity-time {
  font-size: 16px;
  font-weight: 100;
}

.activity-details {
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: 100%;
}

.activity-comment {
  font-size: 40px;
  font-weight: 500;
}

.score-element {
  font-size: 24px;
}
</style>