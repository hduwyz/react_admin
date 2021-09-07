import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import { reqWeather } from '../../api'
import menuList from '../../config/menuConfig'
import './index.less'
import storageUtils from '../../utils/storageUtils'
import LinkButton from '../link-button'

import { Modal} from 'antd';
const { confirm } = Modal;

/**
 * 头部导航栏组件
 */
class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),//当前时间字符串
        // dayPictureUrl: '',//天气的图片
        weather: ''//天气的文本
    }
    getTime = () => {
        this.intervalId = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }

    getWeather = async () => {
        const { weather } = await reqWeather('北京')
        this.setState({weather})
    }

    getTitle = () => {
        // 得到当前请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
        if (item.key===path) { // 如果当前item对象的key与path一样,item的title就是需要显示的title
            title = item.title
        } else if (item.children) {
            // 在所有子item中查找匹配的
            const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
            // 如果有值才说明有匹配的
            if(cItem) {
            // 取出它的title
            title = cItem.title
            }
        }
        })
        return title
    }

    //退出登录
    logout = () => {
        //显示确认框
        confirm({
            content: '确认退出吗？',
            onOk: () => {
            //   console.log('OK');
                //删除保存的用户数据
                storageUtils.removeUser()
                memoryUtils.user = {}
                //跳转到login
                this.props.history.replace('/login')
            }
          });
    }

    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }
    render() {
        const { currentTime, weather } = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{ username }</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        { title }
                    </div>
                    <div className="header-bottom-right">
                        <span>{ currentTime }</span>
                        <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="weather" />
                        <span>{ weather }</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
