import React, { Component } from 'react'
import { Col, Row } from 'antd'
import './Admin.less'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home'

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Row>
          <Col span={4} className="nav-left">
            <NavLeft />
          </Col>
          <Col span={20} className="main">
            <Header />
            <div className="content">
              {/* <Home /> */}
              {this.props.children}
            </div>
            <Footer />
          </Col>
        </Row>
      </div>
    )
  }
}
