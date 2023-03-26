<template>
  <div class="activity-info-container">
    <div class="activity-basic-info-container">
      <div>
        <ActivityIcon
          :product="activity.product"
          :iconFileName="activity.iconFileName"
        />
      </div>
      <div class="activity-topic">
        {{ activity.topic_data.name }}
      </div>
      <ActivityTime
        :date="activity.formattedDate"
        :time="activity.formattedTime"
      />
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

.activity-info-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.activity-basic-info-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.activity-topic {
  font-size: 40px;
  color: black;
}
</style>