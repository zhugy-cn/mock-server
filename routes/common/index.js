const router = require("koa-router")();
const Mock = require("mockjs");
const Random = Mock.Random;

router.prefix("/common");

// 获取轮播图
router.get("/getBanner", async (ctx, next) => {
  let banner = [];
  for (let index = 0; index < 4; index++) {
    banner.push(
      Mock.mock({
        id: Random.guid(),
        link_href: "javascript:;",
        img_url: Random.image("750x400", Random.color())
      })
    );
  }
  ctx.body = {
    data: banner,
    code: 0
  };
});

module.exports = router;
