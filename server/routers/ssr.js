const Router = require('koa-router');
const path = require('path');
const fs = require('fs');
const vueServerRender = require('vue-server-renderer');
const serverRender = require('./server-render');
const clientManifestRest = require('../../dist/vue-ssr-client-manifest.json');

const template = fs.readFileSync(path.join(__dirname,'../ssr.template.ejs'),'utf-8');//注意此处之所以不使用require是因为require不能读取html文件

const renderer = vueServerRender.createBundleRenderer(path.join(__dirname, '../../sever-bundle/vue-ssr-server-bundle.json'), {
  inject: false,
  clientManifest: clientManifestRest
})
const pageRouter = new Router();
pageRouter.get('*', async (ctx)=>{
    await serverRender(ctx,renderer,template)
});

module.exports = pageRouter
