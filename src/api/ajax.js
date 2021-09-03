/*
 * 能发送异步ajax请求的函数模块
封装axios库
函数的返回值是promise对象
1.优化统一处理异常
在外层包一个自己创建的promise对象
请求出错时，提示
 */
import { message } from 'antd'
import axios from 'axios'

export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise
        //1.执行异步ajax请求
        if (type === 'GET') { //发送get请求
            promise = axios.get(url, { // 配置对象
                params: data //指定请求对象
            })
        } else {  //发送post请求
            promise = axios.post(url, data)
        }
        //2.如果成功了，调用resolve(value)
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
        //3.如果失败了，不用调用reject(reason),而是提示异常信息
            message.error('请求出错了：' + error.message)
        })
        
    })

    
    
}

