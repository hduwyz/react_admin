import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu} from 'antd';

import menuList from '../../config/menuConfig'
import './index.less'
import logo from '../../assets/images/logo.png'

const { SubMenu } = Menu;

/**
 * 左侧导航栏组件
 */
class LeftNav extends Component {

      /*
  根据menu的数据数组生成对应的标签数组
  使用reduce() + 递归调用
  */
    getMenuNodes = (menuList) => {
      // 得到当前请求的路由路径
    const path = this.props.location.pathname
    return menuList.reduce((pre, item) => {

        // 向pre添加<Menu.Item>
        if(!item.children) {
            pre.push((
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key}>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            ))
          } else {
            const cItem = item.children.find(cItem => cItem.key === path)
            if (cItem) {
                this.openKey = item.key
            }
            // 向pre添加<SubMenu>
            pre.push((
                <SubMenu key={item.key} icon={item.icon} title={item.title}>
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            ))
          }
      return pre
    }, [])
  }
 
    /*
  在第一次render()之前执行一次
  为第一个render()准备数据(必须同步的)
   */
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
    }
    
    render() {
        // 得到当前请求的路由路径
        let path = this.props.location.pathname
        console.log('render()', path)
        //得到需要打开菜单项的key
        const openKey = this.openKey
        return (
            <div className='left-nav'>
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>

        )
    }
}

/**
 * withRouter高阶组件：
 * 包装非路由组件，返回一个新的组件
 * 新的组件向非路由组件传递3个属性：history/location/match
 */
export default withRouter(LeftNav)