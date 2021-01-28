import React, { Component } from 'react'
import { Card, Button, message } from 'antd'
import './ui.less'

export default class Messages extends Component {
    handleOpen = type => {
        message.config({
            // maxCount: 13
        })
        message[type]({
            content: '恭喜你，React进阶成功'
        })
    }
    render() {
        return (
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={()=>this.handleOpen('success')}>Success</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('info')}>Info</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('warning')}>Warning</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('warn')}>Warn</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('error')}>Error</Button>
                    <Button type="primary" onClick={()=>this.handleOpen('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}
