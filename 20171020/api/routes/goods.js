let express = require('express');
let router = express.Router();
let Goods = require('../models/goods');

//1.查询商品列表数据
router.get('/list', (req, res, next) => {
  let page = Number.parseInt(req.param('page'));
  let pageSize = Number.parseInt(req.param('pageSize'));
  let sort = req.param('sort');
  let skip = (page-1)*pageSize;
  let priceLevel = req.param('priceLevel'); //all 0[0-100] 1[100-500]
  let params = {};
  if (priceLevel !== 'all') {
    let priceItem = [[0, 100], [100, 500], [500, 1000], [1000, 5000]];
    params = {
      salePrice: {
        $gt: priceItem[priceLevel][0],
        $lte: priceItem[priceLevel][1]
      }
    }
  }
  //查找商品
  Goods
  .find(params)
  .sort({'salePrice': sort})
  .skip(skip)
  .limit(pageSize)
  .exec((err, doc) => {
    if (err) {
      return res.json({
        status: "1",
        msg: err.message
      });
    }
    return res.json({
      status: '0',
      msg: '',
      result: {
        count: doc.length,
        list: doc
      }
    })
  })
});

//2.加入到购物车
router.post('/addCart', (req, res, next) => {
  /**
  得到用户的信息,验证如果用户不存在给提示不存在
  如果用户存在则对购物车进行遍历，判断购物车中的商品的ID和购买的商品ID是否相同，如果有相同的则把产品数量+1
  如果之前没有买过这个商品，通过产品ID得到产品信息，给产品的购买数量设置为1，设置是否选中为1，添加到用户的cartList, 保存用户的信息
  */
  let userId = req.cookies.userId, productId = req.body.productId;
  if (!userId || !productId || !parseInt(productId)) {
    return res.json({
      status: "1",
      msg: '参数不正确',
      result: ''
    })
  }
  let User = require('../models/user');
  User.findOne({userId}, (err, userDoc) => {
    if (err) {
      return res.json({
        status: "1",
        msg: err.message
      });
    }
    console.log("userDoc:" + userDoc);
    let goodsItem = '';//购物项
    userDoc.cartList.forEach(item => {
      if (item.productId === productId) {
        goodsItem = item;
        item.productNum++;
      }
    });
    //之前买过
    if (goodsItem) {
      userDoc.save((err, doc) => {
        if (err) {
          return res.json({
            status: '1',
            msg: err.message
          })
        }
        return res.json({
          status: '0',
          msg: '',
          result: 'suc'
        })
      })
    } else {//未买过
      Goods.findOne({productId}, (err, doc) => {
        if (err) {
          return res.json({
            status: '1',
            msg: err.message
          })
        }
        doc.productNum = 1;
        doc.checked = 1;
        userDoc.cartList.push(doc);
        userDoc.save((err, doc) => {
          if (err) {
            return res.json({
              status: '1',
              msg: err.message
            })
          }
          return res.json({
            status: '0',
            msg: '',
            result: 'suc'
          })
        })
      });
    }
  });
});

module.exports = router;
