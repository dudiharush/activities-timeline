<template>
  <div>
    <ActivityInfo :activity="activity" />
  </div>
</template>
    
    <script>
import ActivityInfo from "../components/ActivityInfo.vue";
import { formatActivity } from "../utils.js";

export default {
  components: {
    ActivityInfo,
  },
  data() {
    return {
      listItems: [],
      activityId: this.$route.params.id,
    };
  },
  computed: {
    activity: function () {
      const activity = this.listItems.find(
        (activity) => activity.id === this.activityId
      );
      if (activity === undefined) return;
      return formatActivity(activity);
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
  
  <style scoped>
</style>