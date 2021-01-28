import React, { Component } from 'react'
import { Spin, Card, Icon, Alert } from 'antd'

export default class Loadings extends Component {
    render() {
        let icon = <Icon type="loading" />;
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{margin: '0 20px'}}/>
                    <Spin size="large" spinning={true}/>
                    <Spin indicator={icon} style={{marginLeft: '20px'}} />
                </Card>
                <Card title="内容遮罩" >
                    <Alert type="success" 
                        message="React" 
                        description="欢迎来到React高级实战课程"
                        closable
                        closeText="close now"
                        style={{marginBottom: '10px'}}
                    />
                    <Alert type="warning"
                        message="React"
                        description="欢迎来到React高级实战课程"
                        showIcon
                        style={{marginBottom: '10px'}}
                    />
                    <Spin tip="加载中...">
                        <Alert type="info"
                            message="React"
                            showIcion
                            description="欢迎来到React高级实战课程"
                            style={{marginBottom: '10px'}}
                       />
                    </Spin>
                    <Spin indicator={icon} tip="正在加载。。。">
                        <Alert type="error"
                            message="React"
                            showIcion
                            description="欢迎来到React高级实战课程"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
