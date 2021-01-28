import { Col, Row } from 'antd'
import React, { Component } from 'react'
import './index.less'
import Utils from '../../utils/utils';
import axios from 'axios'

export default class index extends Component {
    componentWillMount() {
        this.setState({
            userName: '在水一方'
        })
        setInterval(() => {
            this.setState({
                sysTime: Utils.formateDate(Date.now())
            })
        }, 1000)
        this.setState({
            sysTime: Utils.formateDate(Date.now())
        })
        this.getWeatherAPIData();
    }
    getWeatherAPIData = () => {
        let city = '北京';
        axios.get('/weather?key=S2IA15GUkkzuAwCBf&location='+encodeURI(city)+'&language:zh-Hans&unit=c')
            .then(res => {
                this.setState({
                    weather: res.data
                })
            })
    }
    render() {
        let city = this.state.weather && this.state.weather.results[0].location.name;
        let weather = this.state.weather && this.state.weather.results[0].now.text;
        return (
            <div className="header">
                <Row className="header-top" key={1}>
                    <span>欢迎，{this.state.userName}</span>
                    <a href="#">退出</a>
                </Row>
                <Row className="breadcrumb" key={2}>
                    <Col span={4} className="breadcrumb-title" key={1}>首页</Col>
                    <Col span={20} className="weather" key={2}>
                        <span className="date">{this.state.sysTime}</span>
                        <span className="city">{city}</span>
                        <span className="weather-detail">{weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
