import React, { Component } from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './ui.less'

export default class Buttons extends Component {
    state = {
        loading: true,
        size: 'default'
    }

    handleLoading = loading => {
        this.setState({ loading })
    }
    handleChange = e => {
        this.setState({size: e.target.value})
    }
    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                    <Button type="link">Imooc</Button>
                </Card>
                <Card title="基础按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button icon="search">搜索</Button>
                    <Button icon="download">下载</Button>
                </Card>
                <Card title="Loading" className="card-wrap">
                    <Button onClick={() => this.handleLoading(true)} type="primary" loading={this.state.loading}>确定</Button>
                    <Button onClick={() => this.handleLoading(true)} type="primary" shape="circle" loading={this.state.loading}></Button>
                    <Button onClick={() => this.handleLoading(true)} icon="delete" loading={this.state.loading}>点击加载</Button>
                    <Button onClick={() => this.handleLoading(false)} type="primary">关闭</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button icon="left">返回</Button>
                        <Button>前进<Icon type="right"></Icon></Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button size={this.state.size}type="primary">Imooc</Button>
                    <Button size={this.state.size}type="dashed">Imooc</Button>
                    <Button size={this.state.size}type="danger">Imooc</Button>
                    <Button size={this.state.size}type="ghost">Imooc</Button>
                </Card>
            </div>
        )
    }
}
