<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="close" @click="$emit('close-modal')">
        <div><CloseIcon /></div>
      </div>
      <div
        :style="{
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'center',
          gap: '10px',
        }"
      >
        <div>
          <ActivityIcon :isJr="false" :iconFileName="activity.iconFileName" />
        </div>
        <div :style="{ 'font-size': '40px', color: 'black' }">
          {{ activity.topic_data.name }}
        </div>
        <ActivityTime
          :date="activity.displayDate"
          :time="activity.displayTime"
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
    CloseIcon,
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
.modal-overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.modal {
  z-index: 2;
  text-align: center;
  background-color: white;
  height: 300px;
  width: 700px;
  margin-top: 10%;
  padding: 20px;
  border: 3px solid #9f9f9f;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.close {
  cursor: pointer;
  display: flex;
  justify-content: end;
}

.modal .activity-icon {
  height: 50px;
}

.modal .activity-time {
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