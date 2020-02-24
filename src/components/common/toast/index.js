import Toast from "./Toast.vue"

const obj = {}
obj.install = function(Vue){
// 1.创建组件构造器
const toastContrustor = Vue.extend(Toast)

// 2.通过new组件构造器，创建组件
const toast = new toastContrustor()

// 3.将创建好的对象，手动挂载到一个元素上
toast.$mount(document.createElement('div'))

// 4.toast.$el就是上面的div
document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast;
}
export default obj