/*
 * 包含应用中所有接口的请求函数模块
每个函数的返回值都是promise
 */
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

//请求登录接口
// export function reqLogin(username, password) {
//     ajax('/login', { username, password}, 'POST')
// }
export const reqLogin = (username, password) => ajax(BASE + '/login', { username, password }, 'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')