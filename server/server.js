const Koa = require('koa');
const app = new Koa();
const StaticRouter = require('./routers/static.js');
const path = require('path');
// const send = require('koa-send');
const isDev = process.env.NODE_ENV === 'development';
app.use(async (ctx,next)=>{
   try {
     console.log(`request path is ${ctx.path}`);
     await next();
   }catch(err) {
       console.log(err.message);
       ctx.status = 500;
       if (isDev) {
           ctx.body = err.message;
       }else {
           ctx.body = 'please try agin later';
       }
   }
}) 
// app.use(async (ctx,next)=>{
//    if (ctx.path === '/favicon.ico') {
//        await send(ctx,'/favicon.ico',{root:path.join(__dirname,'../')})
//    }else {
//        await next()
//    }
// })
let pageRouter;
if (isDev) {
    pageRouter = require('./routers/dev-ssr');
}else {
    pageRouter = require("./routers/ssr");
}
app.use(StaticRouter.routes()).use(StaticRouter.allowedMethods());//必须在pageRouter前面
app.use(pageRouter.routes()).use(pageRouter.allowedMethods());
const HOST = process.env.host || '0.0.0.0';
const PORT = process.env.port || 3333;
app.listen(PORT,HOST,()=>{
    console.log(`server is listening on ${HOST}:${PORT}`)
})