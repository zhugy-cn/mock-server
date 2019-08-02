const router = require("koa-router")();
const Mock = require("mockjs");
const Random = Mock.Random;

let List = [];
const count = 35;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: Random.guid(), // id
      "status|0-4": 0,
      "type|0-4": 0,
      type1: Random.pick(["日用品", "其他", "护肤品"]), // 从数组中随机选取一个元素，并返回。
      "price|100-50.2-2": 0, // 生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。
      "price1|100-50.2-2": 0,
      "count|2-10": 0,

      imgList: () => {
        if (i % 3 == 0) {
          return [];
        }
        var list = [];
        for (let index = 0; index < 6; index++) {
          list.push(Random.image("200x200", Random.color()));
        }
        return list;
      },

      orderList: () => {
        var len = Math.ceil(Math.random() * 3);
        var list = [];
        for (let index = 0; index < len; index++) {
          list.push(
            Mock.mock({
              id: Random.guid(),
              name: Random.ctitle(5, 12),
              "count|2-10": 0,
              "price|100-50.2-2": 0,
              img: Random.image("200x200", Random.color())
            })
          );
        }
        return list;
      },

      commentList: () => {
        if (i % 4 == 0) {
          return [];
        }
        var list = [];
        for (let index = 0; index < 4; index++) {
          list.push({
            name: Random.cname(),
            content: Random.csentence(10, 30)
          });
        }
        return list;
      },
      // typ0: '-------------  用户信息  ------------------',
      name: Random.cname(), // 姓名
      name1: Random.cname(), // 姓名
      sex: Random.integer(0, 1), // 性别
      "age|18-60": 0, // 生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
      idCard: Random.id(), // 身份证
      email: Random.email(), // 邮箱
      phone: /^1[385][1-9]\d{8}/, // 电话

      // typ1: '-------------  内容  ------------------',
      content_type: Random.ctitle(2, 5),
      title: Random.ctitle(5, 12), // 随机生成一句中文标题。
      words: Random.csentence(10, 30), // 随机生成一段中文文本。(文字)
      content: Random.cparagraph(1, 3), // 随机生成一段中文文本。(句子)

      // typ2: '-------------  图片  ------------------',
      imgUrl: Random.image("750x400", Random.color()),
      picture: Random.image("200x200", Random.color()),

      // typ3: '-------------  时间  ------------------',
      start_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
      end_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
      update_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
      create_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),

      // typ4: '-------------  地址  ------------------',
      region: Random.region(), //生成一个大区
      province: Random.province(), //生成一个省份
      city: Random.city(), //生成一个市
      country: Random.county(), //一个县
      zip: Random.zip(), //邮政编码
      start_addr: Random.county(true),
      end_addr: Random.county(true)
    })
  );
}

router.get("/getList", async (ctx, next) => {
  let { page = 1, limit = 20, type } = ctx.query;
  let dataList = [];

  if (type && type != 0) {
    dataList = List.filter((item, index) => item.type == type);
  } else {
    dataList = List;
  }
  const pageList = dataList.filter(
    (item, index) => index < limit * page && index >= limit * (page - 1)
  );
  ctx.body = {
    data: {
      count: List.length,
      list: pageList
    },
    code: 0
  };
});

router.get("/getBanner", async (ctx, next) => {
  let banner = [];
  for (let index = 0; index < 4; index++) {
    banner.push(
      Mock.mock({
        id: Random.guid(),
        imgUrl: Random.image("750x400", Random.color()),
        picture: Random.image("200x200", Random.color())
      })
    );
  }
  ctx.body = {
    data: banner,
    code: 0
  };
});

router.get("/getData", async (ctx, next) => {
  let data = [];
  for (let index = 0; index < 10; index++) {
    data.push(
      Mock.mock({
        id: Random.guid(), // id
        "status|0-4": 0,
        "type|0-4": 0,
        type1: Random.pick(["日用品", "其他", "护肤品"]), // 从数组中随机选取一个元素，并返回。
        "price|100-50.2-2": 0, // 生成一个浮点数，整数部分大于等于 min、小于等于 max，小数部分保留 dmin 到 dmax 位。
        "price1|100-50.2-2": 0,
        "count|2-10": 0,

        // typ0: '-------------  用户信息  ------------------',
        name: Random.cname(), // 姓名
        name1: Random.cname(), // 姓名
        sex: Random.integer(0, 1), // 性别
        "age|18-60": 0, // 生成一个大于等于 min、小于等于 max 的整数，属性值 number 只是用来确定类型。
        idCard: Random.id(), // 身份证
        email: Random.email(), // 邮箱
        phone: /^1[385][1-9]\d{8}/, // 电话

        // typ1: '-------------  内容  ------------------',
        content_type: Random.ctitle(2, 5),
        title: Random.ctitle(5, 12), // 随机生成一句中文标题。
        words: Random.csentence(10, 30), // 随机生成一段中文文本。(文字)
        content: Random.cparagraph(1, 3), // 随机生成一段中文文本。(句子)

        // typ2: '-------------  图片  ------------------',
        imgUrl: Random.image("750x400", Random.color()),
        picture: Random.image("200x200", Random.color()),

        // typ3: '-------------  时间  ------------------',
        start_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        end_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        update_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),
        create_time: Random.datetime("yyyy-MM-dd HH:mm:ss"),

        // typ4: '-------------  地址  ------------------',
        region: Random.region(), //生成一个大区
        province: Random.province(), //生成一个省份
        city: Random.city(), //生成一个市
        country: Random.county(), //一个县
        zip: Random.zip(), //邮政编码
        start_addr: Random.county(true),
        end_addr: Random.county(true)
      })
    );
  }
  ctx.body = {
    data: data,
    code: 0
  };
});

// 雪花啤酒



let beerData = [];
let beerCount = 120
for (let index = 0; index < beerCount; index++) {
  beerData.push(
    Mock.mock({
      id: Random.guid(), // id
      name: Random.ctitle(5, 12), // 随机生成一句中文标题。
      thumb_img: Random.image("200x200", Random.color()),
      "price|100-50.2": 0,
      created_at: Random.datetime("yyyy-MM-dd HH:mm:ss")
    })
  );
}
router.get("/beer", async (ctx, next) => {
  let { page = 1, page_size = 20, type } = ctx.query;
  let dataList = [];
  if (type && type != 0) {
    dataList = beerData.filter((item, index) => item.type == type);
  } else {
    dataList = beerData;
  }
  const pageList = dataList.filter(
    (item, index) => index < page_size * page && index >= page_size * (page - 1)
  );
  ctx.body = {
    data:pageList
  }
});

module.exports = router;
