import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Select, message } from 'antd'

import FilterForm from './FilterForm'
import axios from '../../axios/axios'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'

const FormItem = Form.Item;
const Option = Select.Option;


class City extends Component {
    state = {
        isShowOpenCity: false
    }
    params = {
        page: 1
    }

    componentDidMount() {
        this.request();
    }

    filterSubmit = params => {
        this.params = params;
        this.request();
    }

    request = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
            data: {
                params: {
                    isShowLoading: true,
                    page: this.params.page,
                    
                }
            },
            isMock: true
        }).then(res => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: Utils.pagination(res, current => {
                    _this.params.page = current;
                    _this.request();
                })
            })
        })
    }

    // 开通城市
    handleOpen = () => {
        this.setState({isShowOpenCity: true})
    }

    // 城市开通提交
    handleSubmit = () => {
        let _this = this;
        const cityInfo = _this.cityForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo,
                isShowLoading: true
            }
        }).then(res => {
            if(res.code === 0) {
                message.success(res.result.msg);
                _this.setState({
                    isShowOpenCity: false
                });
                _this.request();
            }
        })
    }

    render() {
        
        const columns = [{
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render: (mode) => {
                    return mode === 1 ? '指定停车点模式' : '禁停区模式'
                }
               
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render: (op_mode) => {
                    return op_mode === 1 ? '自营' : '加盟'
                }
                
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render: arr => {
                    return arr.map(item => {
                        return item.user_name
                    }).join('，')
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: (time) => {
                    return Utils.formateDate(time);
                }
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]
        const formList = [
            {
                type: 'SELECT',
                field: 'city_id',
                label: '城市',
                placeholder: '全部',
                width: 80,
                initialValue: 1,
                list: [
                    {id: 1, name: '北京市'},
                    {id: 2, name: '天津市'},
                    {id: 3, name: '上海市'}
                ]
            },
            {
                type: 'SELECT',
                field: 'mode',
                label: '用车模式',
                placeholder: '全部',
                width: 150,
                initialValue: 1,
                list: [
                    {id: 1, name: '指定停车点模式'},
                    {id: 2, name: '禁停区模式'},
                ]
            },
            {
                type: 'SELECT',
                field: 'op_mode',
                label: '营运模式',
                placeholder: '全部',
                width: 80,
                initialValue: 1,
                list: [
                    {id: 1, name: '自营'},
                    {id: 2, name: '加盟'},
                ]
            },
            {
                type: 'SELECT',
                field: 'auth_status',
                label: '加盟商授权模式',
                placeholder: '全部',
                width: 80,
                initialValue: 1,
                list: [
                    {id: 1, name: '已授权'},
                    {id: 2, name: '未授权'},
                ]
            }
        ]
        return (
            <div>
                <Card>
                    <BaseForm formList={formList} filterSubmit={this.filterSubmit} />
                </Card>
                {/* <Card>
                    <FilterForm />
                </Card> */}
                <Card style={{marginTop: 20}}>
                    <Button type="primary" onClick={this.handleOpen}>开通城市</Button>  
                </Card>
                <div className="content-wrap">
                    <Table 
                        columns={columns}
                        dataSource={this.state.list}
                        bordered
                        pagination={this.state.pagination}
                    />
                </div>
                <Modal
                    title="开通城市"
                    visible={this.state.isShowOpenCity}
                    onCancel={()=>{
                        this.setState({isShowOpenCity: false})
                    }}
                    onOk={this.handleSubmit}
                >
                    <OpenCity wrappedComponentRef={inst=>this.cityForm=inst} />
                </Modal>
            </div>
        )
    }
}

export default Form.create()(City);

class OpenCity extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const FormLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form>
                <FormItem label="城市" {...FormLayout}>
                    {
                        getFieldDecorator('city_id', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择城市'
                                }
                            ]
                        })(
                            <Select style={{width: 140}}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">杭州市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...FormLayout}>
                    {
                        getFieldDecorator('mode', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择营运模式'
                                }
                            ]
                        })(
                            <Select style={{width: 140}}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...FormLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择用车模式'
                                }
                            ]
                        })(
                            <Select style={{width: 140}}>
                                <Option value="">全部</Option>
                                <Option value="1"></Option>
                                <Option value="2">指定停车点</Option>
                                <Option value="3">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCity = Form.create()(OpenCity)