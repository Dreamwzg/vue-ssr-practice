// import Vue from 'vue'
import User from './User.vue';
import VueRouter from 'vue-router';
import Tab from '../components/Tab.vue'
// Vue.use(VueRouter)
export default function createRouter() {
    return new VueRouter({
        routes: [{
          path: '/',
          component: User,
          children: [{
            path: '/',
            component: Tab
          }]
        }, {
          path: '/user',
          component: User
        }],
        mode:'history'
      })
}

