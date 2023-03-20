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
        border: '1px solid #C5C5C5',
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
        <div>
          <img
            :src="require(`../assets/topics/${activity.iconFileName}`)"
            width="20px"
            height="auto"
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
      <div :style="{ display: 'flex', gap: '10px' }">
        <div>score</div>
        <div>view work</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["activity"],
};
</script>