import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
// import * as echarts from 'echarts'
import echarts from 'echarts/lib/echarts'


// 导入柱形图
import 'echarts/lib/chart/pie'
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
                text: '饼图其一',
                x: 'center',
            },
            legend: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ],
                orient: 'vertical',
                right: 10,
                top: 20
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}</br>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value: '1000',
                            name: '周一'
                        }, {
                            value: '2000',
                            name: '周二'
                        }, {
                            value: '4000',
                            name: '周三'
                        }, {
                            value: '8000',
                            name: '周四'
                        }, {
                            value: '10000',
                            name: '周五'
                        }, {
                            value: '12000',
                            name: '周六'
                        }, {
                            value: '15000',
                            name: '周日'
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '饼图其二',
                x: 'center',
            },
            legend: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ],
                orient: 'vertical',
                right: 10,
                top: 20
            },
            
            tooltip: {
                trigger: 'item',
                formatter: '{a}</br>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    data: [
                        {
                            value: '1000',
                            name: '周一'
                        }, {
                            value: '2000',
                            name: '周二'
                        }, {
                            value: '4000',
                            name: '周三'
                        }, {
                            value: '8000',
                            name: '周四'
                        }, {
                            value: '10000',
                            name: '周五'
                        }, {
                            value: '12000',
                            name: '周六'
                        }, {
                            value: '15000',
                            name: '周日'
                        }
                    ]
                }
            ]
        }
        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '饼图其二',
                x: 'center',
            },
            legend: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日', ],
                orient: 'vertical',
                right: 10,
                top: 20
            },
            
            tooltip: {
                trigger: 'item',
                formatter: '{a}</br>{b}:{c}({d}%)'
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    roseType: 'radius',
                    data: [
                        {
                            value: '3000',
                            name: '周一'
                        }, {
                            value: '2000',
                            name: '周二'
                        }, {
                            value: '4000',
                            name: '周三'
                        }, {
                            value: '8000',
                            name: '周四'
                        }, {
                            value: '10000',
                            name: '周五'
                        }, {
                            value: '12000',
                            name: '周六'
                        }, {
                            value: '15000',
                            name: '周日'
                        }
                    ].sort((a,b)=>{
                        return a.value-b.value
                    })
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