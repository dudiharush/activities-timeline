<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="close" @click="$emit('close-modal')">
        <div><CloseIcon /></div>
      </div>
      <ActivityInfo :activity="activity" />
    </div>
  </div>
</template>
  
  <script>
import CloseIcon from "./CloseIcon.vue";
import ActivityInfo from "./ActivityInfo.vue";

export default {
  props: ["activity"],
  components: {
    CloseIcon,
    ActivityInfo,
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
</style>