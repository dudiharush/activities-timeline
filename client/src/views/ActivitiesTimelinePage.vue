<template>
  <div>
    <ActivitiesTimeline :activityList="activityList" />
  </div>
</template>

<script>
// @ is an alias to /src
import ActivitiesTimeline from "@/components/ActivitiesTimeline.vue";

export default {
  components: {
    ActivitiesTimeline,
  },
  methods: {
    async fetchActivities() {
      const res = await fetch("http://localhost:3000/activities/v1");
      const jsonRes = await res.json();
      this.activityList = jsonRes;
    },
  },
  mounted() {
    this.fetchActivities();
  },
  data() {
    return {
      activityList: [],
    };
  },
};
</script>
