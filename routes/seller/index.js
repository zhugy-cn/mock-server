const router = require("koa-router")();

const data = require("./data.js");

function delayResponse(time) {
  return async (ctx, next) => {
    await next();
    await new Promise(resolve => setTimeout(resolve, time));
  };
}

router.get("/test", function(ctx, next) {
  ctx.throw(404, {
    message: "修改错误"
  });
});

// 首页的接口
router.post("/sellerIndexData/indexData", delayResponse(300), (ctx, next) => {
  ctx.success({
    tradeAmount: "103000",
    futureAmount: "214000"
  });
});

router.post(
  "/payAccount/getAcountMoneyByShopAdminId",
  delayResponse(200),
  (ctx, next) => {
    ctx.success(data.account);
  }
);
// 通告
router.post("/announcement/getPFToShopAnnouncement", function(ctx, next) {
  ctx.success(data.announcement);
});
router.post("/announcement/getAnnouncementById", function(ctx, next) {
  ctx.success(data.announcement[0]);
});
// 用户信息
router.get("/userManager/getUserInfo", function(ctx, next) {
  ctx.success(data.userInfo);
});

router.post("/maintainRecord/getMaintainRecordByType", function(ctx, next) {
  ctx.success({
    description: 12312,
    startDate: 3123,
    endDate: 312312
  });
});
router.post("/shop/getShopByManager", function(ctx, next) {
  ctx.success(data.shopList);
});
router.post("/withdraw/shopOneKeyApplyCash", function(ctx, next) {
  ctx.success([]);
});

// 订单列表
router.post("/order/getOrderByShopIdList", delayResponse(100), function(
  ctx,
  next
) {
  ctx.success(data.orderList);
});
// 订单详情
router.post("/order/getOrderDetailById", function(ctx, next) {
  let orderId = ctx.request.body.orderId - 1;
  ctx.success(data.orderList.list[orderId]);
});
// 订单退款
router.post("/orderReturn/getOrderInfoByOrderId", function(ctx, next) {
  let orderId = ctx.request.body.orderId - 3;
  ctx.success(data.orderRefund[orderId]);
});
// 游戏订单
router.post("/gameOrder/getGameExtendByOrderId", function(ctx, next) {
  ctx.success(data.gameOrder);
});

// 数据报表
router.post("/backGround/allData", delayResponse(200), function(ctx, next) {
  ctx.success(data.allData);
});
router.post("/platformStats/getShopStatForShop", function(ctx, next) {
  ctx.success(data.chartData);
});

// 成员列表
router.post(
  "/merchantServerController/getMemberInfoList",
  delayResponse(150),
  function(ctx, next) {
    ctx.success(data.member);
  }
);
// 成员详细
router.post("/merchantServerController/getMemberDetail", function(ctx, next) {
  let index = ctx.request.body.id - 1;
  ctx.success(data.member.list[index]);
});
// 选择角色
router.post("/merchantServerController/getPlatformOpenRolesList", function(
  ctx,
  next
) {
  ctx.success(data.member.list);
});

// 选择店铺
router.post("/merchantServerController/getManagerShopList", function(
  ctx,
  next
) {
  ctx.success(data.member.list[1].shopList);
});

// 店铺公告
router.post("/announcement/getShopAnnouncement", function(ctx, next) {
  ctx.success(data.announcement);
});
// 店铺详情
router.post("/shop/getShopInfo", function(ctx, next) {
  let index = ctx.request.body.shopId - 1;
  ctx.success(data.shopList[index]);
});
// VIP
router.post("/vipDiscountInfo/getVipDiscountInfoByShopId", function(ctx, next) {
  ctx.success({
    status: 1,
    discountMoney: 80
  });
});

// 上传token
router.post("/file/getUploadToken", function(ctx, next) {
  ctx.success("1131");
});

// 团购商品
router.post("/product/getProductPageListByShopId", delayResponse(150), function(
  ctx,
  next
) {
  ctx.success(data.groupGoods);
});
// 团购商品详情
router.post("/product/getProductDetailById", function(ctx, next) {
  let index = ctx.request.body.id - 1;
  ctx.success(data.groupGoods.list[index]);
});
// 团购商品编辑
router.post("/productCategory/getProductCategoryById", function(ctx, next) {
  ctx.success({
    parentId: "1",
    name: "轻工食品/其他"
  });
});

// 优惠券
router.post("/coupon/queryCouponForShopId", function(ctx, next) {
  ctx.success(data.coupon);
});
router.post("/coupon/queryCouponById", function(ctx, next) {
  let index = ctx.request.body.couponId - 1;
  ctx.success(data.coupon[index]);
});

// 流水
router.post("/tradeDetail/queryTradeDetail", delayResponse(150), function(
  ctx,
  next
) {
  ctx.success(data.report);
});
router.post("/withdraw/queryWithdrawCash", delayResponse(150), function(
  ctx,
  next
) {
  ctx.success(data.history);
});

router.post("/bankCard/getBankCardByShopId", function(ctx, next) {
  let index = ctx.request.body.shopId - 1;
  ctx.success(data.account[index]);
});
router.post("/withdraw/shopApplyCash", function(ctx, next) {
  ctx.success({});
});

router.post("/login/logout", function(ctx, next) {
  ctx.success({});
});

module.exports = router;
