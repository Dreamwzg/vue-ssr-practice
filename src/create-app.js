import Vue from 'vue'
import VueRouter from 'vue-router';
import Meta from 'vue-meta';
import App from './App.vue'
import User from './Router/User.vue';
import createRouter from './Router/createRouter';
Vue.use(VueRouter);
Vue.use(Meta);//在vue使用服务端渲染的时候，如果需要根据不同的路由动态改变head内标签的内容，此时可以借助vue-meta；当不使用ssr时也可以使用此插件完成路由切换时动态改变title内容(head里面的标签（title，meta等）)；
export default () => {
  const router = createRouter();
  const app = new Vue({
    el: '#app',
    router,
    components: {
      User
    },
    render: h => h(App)
  })
  return {app,router}
}
