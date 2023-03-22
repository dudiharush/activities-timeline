<template>
  <div class="activity-types-container">
    <div
      v-for="(label, activityType) in this.filters"
      :key="activityType"
      class="activity-type"
      :class="{ selected: isSelected(activityType) }"
      @click="$emit('select-filter', activityType)"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["selectedActivityTypes"],
  data() {
    return {
      filters: {
        movie: "Movies",
        quiz: "Quiz",
        easy_quiz: "Easy Quiz",
        challenge: "challenge",
        make_a_map: "Make-a-Map",
        make_a_movie: "Make-a-Movie",
        word_play: "Word Play",
        related_reading: "Related Reading",
        draw_about_it: "Draw About It",
      },
    };
  },
  methods: {
    isSelected(activityType) {
      return this.selectedActivityTypes.includes(activityType);
    },
  },
};
</script>

<style scoped>
.activity-type {
  border: 2px solid #008081;
  color: #008081;
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.activity-type.selected {
  background-color: #bdebd6;
}

.activity-types-container {
  display: flex;
  gap: 6px;
  padding-bottom: 15px;
}
</style>