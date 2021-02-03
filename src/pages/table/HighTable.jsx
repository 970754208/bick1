import React, { Component } from 'react'
import { Card, Table, message, Button, Modal, Badge } from 'antd'
import axios from '../../axios/axios'
import Utils from '../../utils/utils'

export default class HighTable extends Component {
    state = {
        dataSource2: []
    }
    params = {
        page: 1
    }
    componentDidMount() {
        this.request();
    }

    request = () => {
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page,
                    isShowLoading: true
                }
            }
        }).then(res => {
            if(res.code === 0) {
                res.result.list.forEach((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys: [],
                    selectedRowKeys2: [],
                    selectedRows: [],
                    pagination: Utils.pagination(res, (current) => {
                        this.params.page = current;
                        this.request();
                    })
                })
            }
        })
    }
    handleChange = (pagination, filters, sorter, extra) => {
        // console.log(pagination, filters, sorter, extra)
        this.setState({
            sortOrder: sorter.order
        })
    }
    handleDelete = item => {
        // console.log(item)
        Modal.confirm({
            title: '提示',
            content: `你确定要删除id为${item.id}的item吗？`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: sex => sex===1? '男': '女',
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    const config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'hobbies',
                render: hobbies => {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    };
                    return config[hobbies];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 100,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 100,
                fixed: 'left'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: sex => sex===1? '男': '女'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    const config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子',
                        '4': '百度FE',
                        '5': '创业者'
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'hobbies',
                render: hobbies => {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    };
                    return config[hobbies];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 100,
                fixed: 'right'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 100,
                fixed: 'right'
            }
        ];
        columns2.forEach((item, index) => {
            item.key = index;
        }) 
        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render: sex => sex===1? '男': '女'
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: state => {
                    const config = {
                        '1': <Badge status="success" text='咸鱼一条' />,
                        '2': <Badge status="error" text='风华浪子' />,
                        '3': <Badge status="default" text='北大才子' />,
                        '4': <Badge status="processing" text='百度FE' />,
                        '5': <Badge status="warning" text='创业者' />,
                    };
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'hobbies',
                render: hobbies => {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    };
                    return config[hobbies];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 70,
                sorter: (a, b) => {
                    return a.age - b.age
                },
                sortOrder: this.state.sortOrder
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            },
            {
                title: '删除',
                render: (index, item) => {
                    // console.log(index, item)
                    return <Button type="primary" size="small" onClick={()=>{
                        this.handleDelete(item)
                    }}>删除</Button>
                }
            }
        ];
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '1',
                hobbies: '1',
                birthday: '2001-01-02',
                address: '河北省保定市',
                time: '08:00'
            },
            {
                id: '1',
                userName: 'Jack',
                sex: '1',
                state: '1',
                hobbies: '1',
                birthday: '2001-01-02',
                address: '河北省保定市',
                time: '08:00'
            },
            {
                id: '2',
                userName: 'Jack',
                sex: '1',
                state: '1',
                hobbies: '1',
                birthday: '2001-01-02',
                address: '河北省保定市',
                time: '08:00'
            }
        ]
        dataSource.forEach((item, index) => {
            item.key = index
        })
        return (
            <div>
                <Card title="头部固定" style={{margin: '10px 0'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                        scroll={{y: 240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin: '10px 0'}}>
                    <Table 
                        columns={columns2}
                        dataSource={dataSource}
                        pagination={false}
                        bordered
                        scroll={{x: 2900}}
                    />
                </Card>
                <Card title="表格排序&amp;操作按钮" style={{margin: '10px 0'}}>
                    <Table 
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                        onChange={this.handleChange}
                    />
                </Card>
            </div>
        )
    }
}
