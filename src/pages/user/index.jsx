import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker, message } from 'antd'
import moment from 'moment'
import BaseForm from '../../components/BaseForm'
import ETable from '../../components/ETable'
import axios from '../../axios/axios'
import Utils from '../../utils/utils'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default class User extends Component {

    state = {
        isShow: false
    }

    params = {
        page: 1
    }

    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名',
            width: 100,
        },
        {
            type: 'INPUT',
            label: '用户手机',
            field: 'user_tel',
            placeholder: '请输入用户手机号',
            width: 150,
        },
        {
            type: 'DATE',
            label: '请输入入职日期',
            field: 'date',
            placeholder: '请输入入职日期'
        }
    ]

    filterSubmit = (params) => {
        console.log(params)
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        axios.requestList(this, '/user', this.params, true)
    }

    handleOperate = (type) => {
        let item = this.state.selectedItem;
        if(type === 'create') {
            this.setState({
                title: '创建员工',
                isShow: true,
                type
            })
        } else if(type === 'edit' || type === 'detail') {
            let item = this.state.selectedItem;
            if(!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type === 'edit' ? '编辑员工' : '员工详情',
                isShow: true,
                type
            })
        } else if(type === 'delete') {
            if(!item) {
                Modal.info({
                    title: '信息',
                    content: '请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title: '提示',
                content: `确定要删除id为${item.id}的用户吗`,
                onOk: () => {
                    axios.ajax({
                        url: '/user/delete',
                        params: {
                            id: item.id
                        }
                    }).then(res => {
                        this.setState({
                            selectedRowKeys: [],
                            selectedItem: null
                        })
                        if(res.code === 0) {
                            message.success('删除成功');
                            this.requestList();
                        }
                    })
                }
            })
        }
    }

    // 员工提交
    handleSubmit = () => {
        const params = this.userForm.props.form.getFieldsValue();
        const type = this.state.type;
        params.isShowLoading = true;
        console.log(params);
        axios.ajax({
            url: type==='create'? '/user/add': '/user/edit',
            data: {
                params,
                
            },
            isMock: true
        }).then(res => {
            if(res.code === 0) {
                this.setState({
                    isShow: false,
                    selectedRowKeys: [],
                    selectedItem: null
                })
                this.requestList();
                this.userForm.props.form.resetFields();
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
        const footer = this.state.type === 'detail' ? {
            footer:null
        } : '';
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.filterSubmit}  />
                </Card>
                <Card className="operate-wrap">
                    <Button type="primary" icon="plus" onClick={()=>this.handleOperate('create')}>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={()=>this.handleOperate('edit')}>编辑员工</Button>
                    <Button type="primary" onClick={()=>this.handleOperate('detail')}>员工详情</Button>
                    <Button type="primary" icon="delete" onClick={()=>this.handleOperate('delete')}>删除员工</Button>
                </Card>
                <Card>
                    <ETable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        columns={columns}
                        dataSource={this.state.list}
                        bordered
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedItem={this.state.selectedItem}
                    />
                </Card>
                <Modal
                    title={this.state.title}
                    visible={this.state.isShow}
                    onCancel={()=>this.setState({isShow: false})}
                    onOk={this.handleSubmit}
                    { ...footer }
                >
                    <UserForm 
                        wrappedComponentRef={info=>this.userForm=info} 
                        selectedItem={this.state.selectedItem}
                        type={this.state.type}
                    />
                </Modal>
            </div>
        )
    }
}

class UserForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}            
        }
        console.log(this.props)
        let { getFieldDecorator } = this.props.form;
        const item = this.props.selectedItem || {};
        const type = this.props.type;
        // const userNameValue = ;
        // console.log(userNameValue, type)
        return (
            <Form>
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail'? item.userName :
                        getFieldDecorator('user_name', {
                            initialValue: type==='edit'? item.userName: ''
                        })(
                            <Input placeholder="请输入用户名" />
                        )
                    }
                </FormItem>
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail'? item.sex===1?'男':'女' :
                        getFieldDecorator('sex', {
                            initialValue: type==='edit'? item.sex: ''
                        })(
                            <RadioGroup>
                                <Radio value={1}>男</Radio>
                                <Radio value={0}>女</Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail'? item.state :
                        getFieldDecorator('state', {
                            initialValue: type==='edit'? item.state: ''
                        })(
                            <Select>
                                <Option value={1} key={1}>咸鱼一条</Option>
                                <Option value={2} key={2}>风华浪子</Option>
                                <Option value={3} key={3}>北大才子</Option>
                                <Option value={4} key={4}>百度FE</Option>
                                <Option value={5} key={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail'? item.birthday :
                        getFieldDecorator('birthday', {
                            initialValue: type==='edit'? moment(item.birthday): ''
                        })(
                            <DatePicker />
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail'? item.address :
                        getFieldDecorator('address', {
                            initialValue: type==='edit'? item.address: ''
                        })(
                            <TextArea placeholder="请输入联系地址" autoSize={{minRows: 2, maxRows: 4}} />
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create()(UserForm);