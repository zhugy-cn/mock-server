const router = require("koa-router")();
const Mock = require("mockjs");
const Random = Mock.Random;

router.prefix("/order");

let DATA_LIST = [];
let count = 35;

for (let i = 0; i < count; i++) {
  DATA_LIST.push(
    Mock.mock({
      id: i + 1,
      order_no: Random.id(),
      "status|0-3": 0,
      "rank|0-3": 0,
      "price|70-150.2-2": 0,
      "other_price|-70-150.2-2": 0,
      title: Random.csentence(6, 15),
      goods_list: () => {
        var list = [];
        var len = Math.ceil(Math.random() * 3);
        for (let index = 0; index < len; index++) {
          list.push(
            Mock.mock({
              id: index + 1,
              name: Random.csentence(6, 15),
              "original_price|70-150.2-2": 0,
              "current_price|50-100.2-2": 0,
              "give_integral|50-100": 0, // 赠送积分
              "use_integral|50-100": 0, // 可使用积分
              "quantity|1-10": 0,
              cover_path: Random.image("120X120", Random.color())
            })
          );
        }
        return list;
      },
      user: () => {
        return Mock.mock({
          name: Random.cname(), // 姓名
          phone: /^1[385][1-9]\d{8}/ // 电话
        });
      },
      region: Random.region(), //生成一个大区
      province: Random.province(), //生成一个省份
      city: Random.city(), //生成一个市
      district: Random.county(), //一个县
      zip: Random.zip(), //邮政编码
      start_addr: Random.county(true),
      end_addr: Random.county(true),

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

module.exports = router;
