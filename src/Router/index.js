import VueRouter from 'vue-router';
import Vue from 'vue';
import User from './User.vue';
import Tab from '../components/Tab.vue'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/',
    component: User,
    children: [{
      path: '/',
      component: Tab
    }]
    // redict:'/user'
  }, {
    path: '/user',
    component: User
  }],
  mode:'history'
})
export default router;
