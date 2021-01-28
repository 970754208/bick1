import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

export default class Carousels extends Component {
    onChange = (a, b, c) => {
        console.log(a,b,c)
    }
    render() {
        return (
            <div>
                <Card title="文字carousel" className="card-wrap">
                    <Carousel autoplay effect="fade">
                        <div>
                            <h3>ant motion banner-angular</h3>
                        </div>
                        <div>
                            <h3>ant motion banner-react</h3>
                        </div>
                        <div>
                            <h3>ant motion banner-vue</h3>
                        </div>

                    </Carousel>
                </Card>
                <Card title="图片carousel" className="card-wrap slider-wrap">
                    <Carousel autoplay>
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt=""/>
                        </div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}
