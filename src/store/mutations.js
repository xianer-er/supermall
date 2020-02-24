import {
    ADD_COUNTER, ADD_TO_CART
} from './mutations-types'

export default {

    [ADD_COUNTER](state, payLoad) {
      payLoad.count++;
    },
    [ADD_TO_CART](state, payLoad) {
        payLoad.checked=false
        state.cartList.push(payLoad)
    }

}