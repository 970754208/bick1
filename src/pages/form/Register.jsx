import React, { Component } from 'react'
import { Button, Card, Checkbox, DatePicker, Form, Icon, Input, InputNumber, message, Radio, Select, Switch, TimePicker, Upload } from 'antd'
import moment from 'moment'
import './reg.less'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArre = Input.TextArea;

const formLayout = {
    labelCol: {
        xs: 24,
        sm: 4
    },
    wrapperCol: {
        xs: 24,
        sm: 12
    }
}

const subLayout = {
    wrapperCol: {
        xs: 24,
        sm: {
            span: 12,
            offset: 4
        }
    }
}

const autoSize = {
    minRows: 2,
    maxRows: 6
}

class Register extends Component {
    state = {
        userImg: null,
        loading: false
    }
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.success(`${values.userName}，恭喜你注册成功，密码为${values.userPwd}`)
                console.log(values)
            }
        })
    }

    getBase64 = (img, callback)=>{
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = <div>
            <Icon type={this.state.loading? 'loading': 'plus'} /><br/>
            upload
        </div>
        return (
            <div className="register">
                <Card title="注册表单">
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <FormItem label="用户名" {...formLayout}>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: 'username cannot be empty'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="密码" {...formLayout}>
                            {
                                getFieldDecorator('userPwd', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'password cannot be empty'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: 1
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={0}>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber min={0} max={100} />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: 1
                                })(
                                    <Select>
                                        <Option value={0}>书生</Option>
                                        <Option value={1}>帅哥一枚</Option>
                                        <Option value={2}>疯狂浪子</Option>
                                        <Option value={3}>梦里寻她千百度</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formLayout}>
                            {
                                getFieldDecorator('hobbies', {
                                    initialValue: [0, 1, 2]
                                })(
                                    <Select mode="multiple">
                                        <Option value={0}>打篮球</Option>
                                        <Option value={1}>跑步</Option>
                                        <Option value={2}>游泳</Option>
                                        <Option value={3}>电子竞技</Option>
                                        <Option value={4}>踢足球</Option>
                                        <Option value={5}>跑酷</Option>
                                        <Option value={6}>街头健身</Option>
                                        <Option value={7}>桌球</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formLayout}>
                            {
                                getFieldDecorator('married', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch checkedChildren="是" unCheckedChildren="否" />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment()
                                })(
                                    <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '河北省保定市'
                                })(
                                    <TextArre autoSize={autoSize} />
                                )
                            }
                        </FormItem>
                        <FormItem label="早起时间" {...formLayout}>
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment().set('hours', 7).set('minutes', 30).set('minutes', 0)
                                })(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像" {...formLayout}>
                            {
                                getFieldDecorator('upload')(
                                    <Upload 
                                        listType="picture-card"
                                        // action="//jsonplaceholder.typicode.com/posts/"
                                        showUploadList={true}
                                        onChange={this.handleChange}
                                        fileList={null}
                                    >
                                        {
                                            this.state.userImg
                                            ? <img src={this.state.userImg} alt=""/>
                                            : uploadButton
                                        }
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...subLayout}>
                            <Checkbox style={{ marginRight: 10 }}>
                                我已阅读过
                                <a href="#">慕课协议</a>
                            </Checkbox>
                        </FormItem>
                        <FormItem {...subLayout}>
                            <Button htmlType="submit" type="primary">提交</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register)