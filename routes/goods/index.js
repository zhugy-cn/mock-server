const router = require("koa-router")();
const Mock = require("mockjs");
const Random = Mock.Random;

router.prefix("/goods");

let DATA_LIST = [];
let count = 35;

for (let i = 0; i < count; i++) {
  DATA_LIST.push(
    Mock.mock({
      id: i + 1,
      "status|0-3": 0,
      name: Random.csentence(10, 30),
      "original_price|70-150.2-2": 0,
      "current_price|50-100.2-2": 0,
      "give_integral|50-100": 0, // 赠送积分
      "use_integral|50-100": 0, // 可使用积分
      "quantity|1-10": 0,
      cover_path: Random.image("200x200", Random.color()),
      update_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
      create_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
    })
  );
}

// 商品列表
router.get("/getList", async (ctx, next) => {
  let dataList = [];
  let { page = 1, page_size = 20, status = 0 } = ctx.query;

  // 筛选
  if (status) {
    dataList = DATA_LIST.filter((item, index) => item.status == status);
  } else {
    dataList = DATA_LIST;
  }

  // 分页
  const pageList = dataList.filter(
    (item, index) => index < page_size * page && index >= page_size * (page - 1)
  );

  ctx.body = {
    data: {
      count: DATA_LIST.length,
      list: pageList
    },
    code: 0
  };
});

// 根据 id 获取商品
router.get("/getGoodsById", async (ctx, next) => {
  let data = Mock.mock({
    photo_album: () => {
      var list = [];
      for (let index = 0; index < 3; index++) {
        list.push(Random.image("750x300", Random.color()));
      }
      return list;
    },
    cover_path: Random.image("200x200", Random.color()),
    name: Random.csentence(10, 30),
    "use_integral|50-100": 0, // 可使用积分
    "original_price|70-150.2-2": 0,
    "current_price|50-100.2-2": 0,
    "give_integral|50-100": 0, // 赠送积分
    "share_integral|50-100": 0, // 分享积分
    "stock|500-1000": 0, // 库存
    // spec_list: () => {
    //   var list = [];
    //   for (let index = 0; index < 3; index++) {
    //     list.push(Random.image("750x300", Random.color()));
    //   }
    //   return list;
    // },
    cover_path: Random.image("200x200", Random.color()),
    update_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
    create_time: Random.datetime("yyyy-MM-dd HH:mm:ss")
  });

  ctx.body = {
    data: data,
    code: 0
  };
});

module.exports = router;
