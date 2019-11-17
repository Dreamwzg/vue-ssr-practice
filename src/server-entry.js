import createApp from './create-app.js';
export default context=>{//这个函数会在dev-ssr中的vueServerRender.createBundleRenderer中调用
    return new Promise((resolve,reject)=>{
        const {app,router} = createApp();
        router.push(context.url)//手动push，实现路由对应的组件的切换
        router.onReady(()=>{
            context.meta = app.$meta();//获取当前路由组件的meta内容，挂到交给服务端渲染的context对象上
            //ssr实现title切换的本质就是，当路由切换完成的时候（router.onReady事件）通过app.$meta获取到通过vue-meta挂到每个组件上面的metaInfo属性，然后将该属性挂context对象上面，因为context对象会在renderToString的时候被使用，因此可以在renderToString的时候获取到当前组件的meta信息，然后渲染到模板里面，进而实现meta信息根据不同路由实现动态切换的效果
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents) {
                reject(new Error('no component matched'))
            }
            resolve(app);
        })
    })
}
//阅读到1：02：32