const Router = require('koa-router');
const axios = require('axios');
const path = require('path');
const memoryFS = require('memory-fs');
const webpack = require('webpack');
const fs = require('fs');
const vueServerRender = require('vue-server-renderer');
const serverConfig = require('../../webpack.config.server');
const serverRender = require('./server-render');

const serverCompiler = webpack(serverConfig);
const mfs = new memoryFS();
serverCompiler.outputFileSystem = mfs;

let bundle;

serverCompiler.watch({},(err,stats)=>{
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err=>{
        console.log(err)
    });
    stats.warnings.forEach(warn=>{
        console.log(warn);
    })
    const bundlePath = path.join(serverConfig.output.path,'vue-ssr-server-bundle.json');//读物webpack.config.server配置文件打包生成的文件
    bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'));
    console.log('bundle is generated')
})
const handleSSR = async (ctx)=>{
   if (!bundle) {
       ctx.body = '稍等....';
       return 
   }
const clientManifestRest = await axios.get('http://127.0.0.1:8080/dist/vue-ssr-client-manifest.json');
const clientManifest = clientManifestRest.data;
const template = fs.readFileSync(path.join(__dirname,'../ssr.template.ejs'),'utf-8');
const renderer = vueServerRender.createBundleRenderer(bundle,{
    inject:false,
    clientManifest
})
await serverRender(ctx,renderer,template);
}
const router = new Router();
router.get('*',handleSSR);//流程就是根据uri作为router，渲染出不同的组件然后返回，注意返回的内容就是纯模板不会有任何事件绑定的
module.exports = router;

