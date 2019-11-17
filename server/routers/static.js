const Router = require('koa-router');
const send = require('koa-send');

const StaticRouter = new Router({prefix:'/dist'});
StaticRouter.get('/*',async (ctx)=>{
    console.log('--StaticRouter-',ctx.path)
   await send(ctx,ctx.path)
});
module.exports = StaticRouter;