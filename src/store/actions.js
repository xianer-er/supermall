import {
  ADD_COUNTER, ADD_TO_CART
} from './mutations-types'

export default {

  addCart(context, payLoad) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item =>
        item.iid === payLoad.iid
      )
      // 2.判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve("商品数量加一")
      } else {
        payLoad.count = 1
        context.commit(ADD_TO_CART, payLoad)
        resolve("添加了一个商品")
      }

    })
  }

}