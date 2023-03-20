<template>
  <div>
    <div :style="{ height: '15px', 'padding-inline-start': '50px' }">
      <div
        :style="{
          'background-color': '#C5C5C5',
          height: '100%',
          width: '1px',
        }"
      />
    </div>
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
        <div class="activity-icon" :class="{ 'jr-icon': isJr }">
          <div class="jr-tag">Jr.</div>
          <img
            :src="require(`../assets/topics/${activity.iconFileName}`)"
            :style="{
              display: 'block',
              'margin-left': 'auto',
              'margin-right': 'auto',
              width: '100%',
            }"
          />
        </div>
        <div>
          <div :style="{ 'font-weight': 'bold', 'text-align': 'start' }">
            {{ activity.topic_data.name }}
          </div>
          <div :style="{ display: 'flex' }">
            <div>{{ activity.displayDate }}</div>
            <div>&#8226;</div>
            <div>{{ activity.displayTime }}</div>
          </div>
        </div>
      </div>
      <div
        :style="{ display: 'flex', gap: '10px' }"
        class="activity-settings"
        :class="activitySetting(activity.resource_type)"
      >
        <div class="score-element">
          Score: <b>{{ activity.score }}</b
          >/<b>{{ activity.possible_score }}</b>
        </div>
        <div class="zoom-element">
          <div :style="{ display: 'flex', gap: '4px' }">
            <EyeIcon />
            <div :style="{ margin: 'auto' }">View work</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSettings } from "../activitySettingsMap";
import EyeIcon from "./EyeIcon.vue";

export default {
  props: ["activity"],
  components: {
    EyeIcon,
  },
  computed: {
    isJr() {
      return this.activity.product === "bpjr";
    },
  },
  methods: {
    activitySetting: function (t) {
      debugger;
      const x = getSettings(t);
      console.log(x);
      return x;
    },
  },
};
</script>

<style scoped>
.activity-icon {
  height: 25px;
  aspect-ratio: 1;
  border-radius: 20px;
  padding: 5px;
  background-color: #01c5c4;
  position: relative;
}

.activity-icon.jr-icon {
  background-color: #f7ae11;
}

.jr-icon .jr-tag {
  display: flex;
}

.jr-tag {
  width: 15px;
  font-size: 10px;
  font-weight: bold;
  border-radius: 8px;
  aspect-ratio: 1;
  background-color: #ffc45c;
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: none;
  font-style: italic;
}

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