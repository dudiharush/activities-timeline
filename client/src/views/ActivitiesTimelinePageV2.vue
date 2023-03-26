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
      const res = await fetch("http://localhost:3000/activities/v2");
      const jsonRes = await res.json();

      this.activityList = jsonRes.flatMap((activitiesByResourceType) =>
        activitiesByResourceType.activities.map((activity) => ({
          resource_type: activitiesByResourceType.resource_type,
          ...activity,
        }))
      );
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
