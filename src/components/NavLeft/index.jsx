import React, { Component } from 'react'
import menuConfig from '../../config/menuConfig';
import './index.less';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
const { SubMenu } = Menu;

export default class NavLeft extends Component {

    renderMenu = (menu) => {
        return menu.map(item => {
            if(item.children) {
                return (
                    <SubMenu
                        title={item.title}
                        key={item.key}
                    >
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item key={item.key}>
                <NavLink to={'/admin'+item.key}>{item.title}</NavLink>
            </Menu.Item>
        })
    }
    render() {
        return (
            <div className="nav-left">
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Immoc MS</h1>
                </div>
                <Menu theme="dark">
                    {this.renderMenu(menuConfig)}
                </Menu>
            </div>
        )
    }
}
