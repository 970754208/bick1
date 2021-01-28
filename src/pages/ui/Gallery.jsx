import React, { Component } from 'react'
import { Row, Col, Card, Modal } from 'antd'

export default class Gallery extends Component {
    state = {
        imgs: [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png']
        ],
        show: false,
        src: null
    }
    handleShow = src => {
        this.setState({
            src: '/gallery/' + src,
            show: true
        })
    }
    render() {
        const imgList = this.state.imgs.map(list => list.map(item => 
                <Card cover={<img src={'/gallery/'+item} />} 
                    key={item} 
                    style={{marginBottom: '10px'}} 
                    onClick={()=>this.handleShow(item)}
                    hoverable
                >
                    <Card.Meta title="React" description="hold on" />
                </Card>
            ))
        return (
            <div>
                <Row gutter={18}>
                    <Col span={4} md={5} lg={3} key={0}>
                        {imgList[0]}
                    </Col>
                    <Col span={4} md={5} lg={5} key={1} >
                        {imgList[1]}
                    </Col>
                    <Col span={8} md={5} lg={5} key={2}>
                        {imgList[2]}
                    </Col>
                    <Col span={4} md={5} lg={5} key={3}>
                        {imgList[3]}
                    </Col>
                    <Col span={4} md={4} lg={6} key={4}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Modal title="图片展示"
                    visible={this.state.show}
                    onCancel={()=>this.setState({show: false})}
                    footer={null}
                    width={500}
                    height={500}
                >
                    <img src={this.state.src} style={{width: '100%'}} alt=""/>
                </Modal>
            </div>
        )
    }
}
