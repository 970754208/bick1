import React, { Component } from 'react'
import { Card, Table, message, Button, Modal } from 'antd'
import axios from '../../axios/axios'
import Utils from '../../utils/utils'

export default class BasicTable extends Component {
    state = {
        dataResource2: [],
        selectedRowKeys: [],
        selectedRowKeys2: []
    }
    params = {
        page: 1
    }
    componentDidMount() {
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
        this.setState({dataSource})
        this.request();
    }

    request = () => {
        axios.ajax({
            url: '/table/list',
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

    onRowClick = (record, index) => {
        let selectedKey = [index];
        this.setState({
            selectedRowKeys: selectedKey,
            selectedItem: record
        })
        message.success({
            content: `姓名：${record.userName}，地址：${record.address}`
        })
    }

    handleDelete = () => {
        let { selectedRows } = this.state;
        let ids = [];
        selectedRows.forEach(item=>ids.push(item.id))
        Modal.confirm({
            title: '提示',
            content: `你确定要删除吗？${ids.join(' , ')}`,
            onOk: () => {
                message.success({
                    content: '删除成功'
                })
                this.request();
            }
        })
    }

    render() {
        let { selectedRowKeys, selectedRowKeys2 } = this.state;
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
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys: selectedRowKeys2,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRows)
                this.setState({selectedRowKeys2: selectedRowKeys, selectedRows})
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        bordered
                    />
                </Card>
                <Card title="动态表格-mock" style={{margin: '10px 0'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                    />
                </Card>
                <Card title="mock-单选" style={{margin: '10px 0'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                        rowSelection={rowSelection}
                        onRow={(record, index) => ({
                            onClick: () => this.onRowClick(record, index)
                        })}
                    />
                </Card>
                <Card title="mock-多选" style={{margin: '10px 0'}}>
                    <div style={{marginBottom: '10px'}}>
                        <Button type="primary" onClick={()=>{this.handleDelete()}}>删除</Button>
                    </div>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        bordered
                        rowSelection={rowCheckSelection}
                        
                    />
                </Card>
                <Card title="mock-表格分页" style={{margin: '10px 0'}}>
                    <Table 
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                        bordered
                    />
                </Card>
            </div>
        )
    }
}
