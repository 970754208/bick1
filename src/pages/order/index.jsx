import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Select, message, DatePicker } from 'antd'
import axios from '../../axios/axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'


const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Order extends Component {
    state = {
        list: [],
        isEndOrderShow: false,
        orderInfo: {}
    }
    params = {
        page: 1,
        isShowLoading: true
    }

    formList = [
        {
            type: 'SELECT',
            field: 'city',
            label: '城市',
            placeholder: '全部',
            width: 80,
            list: [
                {id: 1, name: '北京市'},
                {id: 2, name: '保定市'},
                {id: 3, name: '上海市'}
            ]
        },
        {
            type: '起止时间',
            field: 'time',
            label: '订单时间'
        },
        {
            type: 'SELECT',
            field: 'status',
            label: '订单状态',
            placeholder: '全部',
            width: 80,
            list: [
                {id: 1, name: '进行中'},
                {id: 2, name: '已结束'}
            ]
        },
    ]

    // 订单查询
    filterSubmit = params => {
        this.params = params;
        this.requestList();
        // console.log(this.params)
    }

    componentDidMount() {
        this.requestList();
    }

    requestList = () => {
        let _this = this;
        axios.requestList(this, '/order/list', this.params, true)
        // axios.ajax({
        //     url: '/order/list',
        //     data: {
        //         params: {
        //             page: _this.params.page,
        //             isShowLoading: true
        //         }
        //     }
        // }).then(res => {
        //     if(res.code === 0) {
        //         _this.setState({
        //             list: res.result.item_list.map((item, index) => {
        //                 item.key = index;
        //                 return item;
        //             }),
        //             pagination: Utils.pagination(res, current => {
        //                 _this.params.page = current;
        //                 _this.requestList();
        //             })
        //         })
        //     }
        // })
    }

    // 结束订单确认框
    handleConfirm = () => {
        if(!this.state.selectedItem) {
            Modal.error({
                title: '错误',
                content: '请选择一个订单'
            })
        } else {
            axios.ajax({
                url: 'order/ebike_info',
                data: {
                    params: {
                        isShowLoading: true
                    }
                }
            }).then(res => {
                this.setState({
                    orderInfo: res.result,
                    isEndOrderShow: true
                })
            })
        }
    }

    // 结束订单
    handleEndOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: 'order/finish_order',
            data: {
                params: {
                    id: item.id
                }
            }
        }).then(res => {
            if(res.code === 0) {
                message.success(res.result.msg);
                this.setState({
                    isEndOrderShow: false,
                    selectedItem: null,
                    selectedRowKeys: []
                })
                this.requestList();
            }
        })
    }

    handleClick = (record, index) => {
        this.setState({
            selectedRowKeys: [index],
            selectedItem: record
        })
    }

    handleOrderDetail = () => {
        let item = this.state.selectedItem;
        if(!item) {
            Modal.error({
                title: '错误',
                content: '请选择一个订单'
            })
        } else {
            window.open(`/#/common/order/detail/${item.id}`, "target=_blank")
        }
    }

    render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render: distance => {
                    return distance / 1000 + 'km'
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                render: time => {
                    let h = Math.floor(time/60);
                    let m = time % 60;
                    return `${h}小时${m}分`
                }
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: status => {
                    return status === 1 ? '进行中' : '已结束'
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const FormLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectedRowKeys
        }
        return (
            <div>
                <Card>
                    {/* <FilterForm /> */}
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit} />
                </Card>
                <Card style={{marginTop: 20}}>
                    <Button type="primary" style={{margin: '0 10px'}} onClick={this.handleOrderDetail}>订单详情</Button>  
                    <Button type="primary" onClick={this.handleConfirm}>结束订单</Button>  
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        bordered
                        pagination={this.state.pagination}
                        rowSelection='checkbox'
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                        selectedIds={this.state.selectedIds}
                    />
                    {/* <Table 
                        columns={columns}
                        dataSource={this.state.list}
                        bordered
                        pagination={this.state.pagination}
                        rowSelection={rowSelection}
                        onRow={(record, index) => ({
                            onClick: () => this.handleClick(record, index)
                        })}
                    /> */}
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.isEndOrderShow}
                    onCancel={()=>{this.setState({isEndOrderShow: false})}}
                    onOk={this.handleEndOrder}
                >
                    <Form>
                        <FormItem label="车辆编号" {...FormLayout}>
                            {this.state.orderInfo.id}
                        </FormItem>
                        <FormItem label="剩余电量" {...FormLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...FormLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...FormLayout}>
                            {this.state.orderInfo.location}   
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

class FilterForm extends Component {
    handleSearch = () => {
        let searchInfo = this.props.form.getFieldsValue();
        console.log(searchInfo)
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="订单时间">
                    {
                        getFieldDecorator('order_time')(
                            <RangePicker showTime />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="全部" style={{width: 80}}>
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">已结束</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleSearch}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create('')(FilterForm);