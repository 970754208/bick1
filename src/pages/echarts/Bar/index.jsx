import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
// import * as echarts from 'echarts'
import echarts from 'echarts/lib/echarts'


// 导入柱形图
import 'echarts/lib/chart/bar'
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
                    type: 'bar',
                    data: [100, 2000, 1400, 1000, 300, 500, 2100]
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
                trigger: 'axis',
                // axisPointer: {
                //     type: 'shadow'
                // }
            },
            legend: {
                data: ['OFO', '摩拜', '小蓝']
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [2000, 3000, 4000, 6000, 8000, 9000, 12000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1800, 2500, 3500, 5400, 6800, 8000, 11000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [1500, 1800, 2000, 3000, 6000, 8000, 9000]
                },
            ]
        }
        return option;
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()} style={{height: 500}} theme="Imooc"/>
                </Card>
                <Card title="柱形图表之二" style={{marginTop: 10}}>
                    <ReactEcharts option={this.getOption2()} style={{height: 500}} theme="Imooc"/>
                </Card>
            </div>
        )
    }
}