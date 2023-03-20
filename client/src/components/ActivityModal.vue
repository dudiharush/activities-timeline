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
    </div>
  </div>
</template>
  
  <script>
import CloseIcon from "./CloseIcon.vue";
import ActivityIcon from "./ActivityIcon.vue";
import ActivityTime from "./ActivityTime.vue";

export default {
  props: ["activity"],
  components: {
    CloseIcon,
    ActivityIcon,
    ActivityTime,
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

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

.modal .activity-icon {
  height: 50px;
}

.modal .activity-time {
  font-size: 16px;
  font-weight: 100;
}
</style>