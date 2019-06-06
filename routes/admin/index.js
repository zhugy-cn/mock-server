const router = require('koa-router')()

function delayResponse(time) {
  return async (ctx, next) => {
    await next();
    await new Promise(resolve => setTimeout(resolve, time));
  }
}

router.post('/admin/user/login', delayResponse(200), (ctx, next) => {
  ctx.success({
    token: '11321',
    info: {
      nick_name: '总管理'
    }
  })
})




module.exports = router
