import Vue from 'vue';
import VueRouter from 'vue-router';
import ActivitiesTimelinePage from '../views/ActivitiesTimelinePage.vue';
import ActivitiesTimelinePageV2 from '../views/ActivitiesTimelinePageV2.vue';
import ActivityPage from '../views/ActivityPage.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ActivitiesTimelinePage',
    component: ActivitiesTimelinePage,
  },
  {
    path: '/timeline-v2',
    name: 'ActivitiesTimelinePageV2',
    component: ActivitiesTimelinePage,
  },
  { path: '/activity/:id', component: ActivityPage },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
