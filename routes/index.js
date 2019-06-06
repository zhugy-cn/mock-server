const router = require('koa-router')()
router.get('/', async (ctx, next) => {
  ctx.body = '<h1>https://api.zhugy.cn/getlist?page=1&limit=10&status=2</h1>';
})
module.exports = router
