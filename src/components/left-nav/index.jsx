import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'

/**
 * 左侧导航栏组件
 */
export default class LeftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
                <header className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </header>
            </div>
        )
    }
}
