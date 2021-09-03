import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

export default class admin extends Component {
    render() {
        //如果内存中没有存储user ===>没有登录
        const user = memoryUtils.user
        if (!user || !user._id) {
            //自动跳转到登录
            return <Redirect to='/login'/>
        }
        return (
            <div>
                hello {user.username}
            </div>
        )
    }
}
