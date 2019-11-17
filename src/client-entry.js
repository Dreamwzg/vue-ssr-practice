import CreateApp from './create-app';
const {app,router} = CreateApp();

//非必须
router.onReady = ()=>{
    app.$mount('#app');
}

