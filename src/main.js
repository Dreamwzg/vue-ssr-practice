import Vue from 'vue'
import App from './App.vue'
import User from './Router/index';
import router from './Router/index';

new Vue({
  el: '#app',
  router,
  components:{
    User
  },
  render: h => h(App)
})
