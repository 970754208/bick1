import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from '../themeDark'
// import * as echarts from 'echarts'
import echarts from 'echarts/lib/echarts'


// 导入柱形图
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {

    componentWillMount() {
        echarts.registerTheme('Imooc', echartTheme)
    }
    
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [2000, 3000, 4000, 6000, 8000, 9000, 12000] 
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]
            },
            yAxis: {
                type: 'value'
            },
            legend: {
                data: ['OFO订单量', '摩拜订单量']
            },
            series: [
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [2000, 3000, 4000, 6000, 8000, 9000, 12000] 
                },
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [3000, 5000, 6000, 8000, 9000, 10000, 14000] 
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ],
                boundaryGap: false
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [2000, 3000, 7000, 4000, 8000, 5000, 1000],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="饼图之一">
                    <ReactEcharts option={this.getOption()} style={{height: 500}} theme="Imooc"/>
                </Card>
                <Card title="饼图之二" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} style={{height: 500}} theme="Imooc"/>
                </Card>
                <Card title="饼图之三" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption3()} style={{height: 500}} theme="Imooc"/>
                </Card>
            </div>
        )
    }
}