import axios from 'axios'

export function request(config){
    // 1.创建axio实例
        const instance =axios.create({
            baseURL:"http://106.54.54.237:8000/api/hy",
            timeout:5000
        })
    // 2.axios拦截器
    // 2.1请求拦截的作用
    instance.interceptors.request.use(config=>{
        // console.log(config)
        return config
        // 1.比如config中的一些信息不符合服务器的要求

        // 2.比如每次发送网络请求时，都希望在界面中显示一个图标

        // 3.某些网络请求（比如登录（token），必携带一些特殊的信息
    },err=>{
        console.log(err)
    })
    // 2.2响应拦截
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err)
    }
    )
        // 3.发送真正的网络请求
       return instance(config)
        
   
}
