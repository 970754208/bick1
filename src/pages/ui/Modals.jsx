import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends Component {
    state = {
        visible1: false,
        visible2: false,
        visible3: false,
        visible4: false
    }
    handleClick = (type) => {
        this.setState({
            [type]: true
        })
    }
    handleMethod = (type) => {
        Modal[type]({
            title: "信息确认框",
            icon: 'download',
            content: "这是一个小的信息框！！！",
            maskClosable: true,
            style:{top: '10px', left: '20px'}
        })
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap" type="inner" hoverable>
                    <Button type="primary" onClick={()=>this.handleClick('visible1')}>Open</Button>
                    <Button type="primary" onClick={()=>this.handleClick('visible2')}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>this.handleClick('visible3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>this.handleClick('visible4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleMethod('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={()=>this.handleMethod('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleMethod('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleMethod('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleMethod('warning')}>Warning</Button>
                </Card>
                <Modal
                    title="Hi 1"
                    visible={this.state.visible1}
                    onCancel={(e)=>{this.setState({visible1: false});console.log(e)}}
                    mask={false}
                >
                    <p>欢迎进入Modal模态框!!!</p>
                </Modal>
                <Modal
                    title="Hi 2"
                    visible={this.state.visible2}
                    onCancel={()=>{this.setState({visible2: false})}}
                    okText="好的"
                    cancelText="算了"
                    style={{top: 20}}
                >
                    <p>欢迎进入Modal模态框!!!</p>
                </Modal>
                <Modal
                    title="Hi 3"
                    visible={this.state.visible3}
                    onCancel={()=>{this.setState({visible3: false})}}
                    centered
                >
                    <p>欢迎进入Modal模态框!!!</p>
                </Modal>
                <Modal
                    title="Hi 4"
                    visible={this.state.visible4}
                    onCancel={()=>{this.setState({visible4: false})}}
                    width="300px"
                    footer={null}
                >
                    <p>欢迎进入Modal模态框!!!</p>
                </Modal>
            </div>
        )
    }
}
