import React, { Component } from 'react'
import { notification, Card, Button } from 'antd'
import './ui.less'

export default class Notice extends Component {
    handleClick = (type, placement) => {
        if(placement) {
            notification.config({
                placement
            })
        }
        notification[type]({
            message: '发工资了',
            description: '满勤+项目提成+工资=100万',
            btn: <Button onClick={this.handleClose}>close now</Button>,
            top: 0,
            bottom: 100,
            // key: '1'
        })
    }
    handleClose = e => {
        notification.close('1')
    }
    render() {
        return (
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleClick('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleClick('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleClick('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.handleClick('error')}>Error</Button>
                </Card>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleClick('success', 'topLeft')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleClick('info', 'topRight')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleClick('warn', 'bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.handleClick('error', 'bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}
