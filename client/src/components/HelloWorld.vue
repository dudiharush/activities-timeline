<template>
  <div :style="{ margin: 'auto', width: '60%' }">
    <div
      v-for="(activities, monthName, index) in activitiesByMonth"
      v-bind:key="monthName"
      :style="{ 'text-align': 'left' }"
    >
      <div
        v-show="index > 0"
        :style="{ height: '15px', 'padding-inline-start': '50px' }"
      >
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
          'text-align': 'center',
          padding: '2px',
          width: '100px',
          'border-radius': '20px',
          'background-color': '#FCF7E1',
        }"
      >
        {{ monthName }}
      </div>
      <div v-for="activity in activities" v-bind:key="activity.id">
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
              <div :style="{ 'font-weight': 'bold' }">
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
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      listItems: [],
    };
  },
  computed: {
    activitiesByMonth: function () {
      const groups = this.listItems.reduce((group, item) => {
        const date = new Date(0);
        date.setUTCSeconds(item.d_created);
        const month = date.toLocaleString("en-us", { month: "short" });
        group[month] = group[month] || [];
        group[month].push({
          ...item,
          displayDate: date.toLocaleString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          displayTime: date.toLocaleTimeString([], { timeStyle: "short" }),
          iconFileName: item.topic_data.icon_path.split("/").at(-1),
        });
        return group;
      }, {});
      return groups;
    },
  },
  methods: {
    async fetchActivities() {
      const res = await fetch("http://localhost:3000/activities/v1");
      const jsonRes = await res.json();
      this.listItems = jsonRes;
    },
  },
  mounted() {
    this.fetchActivities();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
