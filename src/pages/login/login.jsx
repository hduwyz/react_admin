import React, {Component} from 'react'
import {
  Form,
  Input,
  Button,
  message
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.less'
import logo from './images/logo.png'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {

  onFinish = async (values) => {
    // console.log('提交表单发起ajax请求: ', values);
    //请求登录
    const { username, password } = values;
    const result = await reqLogin(username, password)
    console.log("请求成功了", result);
    if (result.status === 0) {//登录成功
      message.success('登录成功');
      //保存用户
      const user = result.data
      memoryUtils.user = user//保存在内存中
      storageUtils.saveUser(user)
      //跳转到管理页面(不需要后退到登录页面)
      this.props.history.replace('/')
    } else {//登录失败
      message.error(result.msg);
    }
    

  };

  onFinishFailed = (errorInfo) => {
    console.log('校验失败:', errorInfo);
  };

  /*
  对密码进行自定义验证
  */
  /*
   用户名/密码的的合法性要求
     1). 必须输入
     2). 必须大于等于4位
     3). 必须小于等于12位
     4). 必须是英文、数字或下划线组成
    */
     validatePwd = (rule, value, callback) => {
      if(!value) {
        callback('密码必须输入')
      } else if (value.length<4) {
        callback('密码长度不能小于4位')
      } else if (value.length>12) {
        callback('密码长度不能大于12位')
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        callback('密码必须是英文、数字或下划线组成')
      } else {
        callback() // 验证通过
      }
    }

  render() {
      //如果用户已经登录则跳转到管理页面
    const user = memoryUtils.user
    if (user || user._id) {
      //自动跳转到登录
      return <Redirect to='/'/>;
  }
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登陆</h2>
          <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
              ]}
              initialValue="admin"
          >
            <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                validator: this.validatePwd
              },
              ]}
              initialValue="admin"
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
        </section>
      </div>
    )
    }
}

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */

/*
1. 前台表单验证
2. 收集表单输入数据
 */

/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */