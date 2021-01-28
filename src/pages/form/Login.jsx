import React, { Component } from 'react'
import { Button, Card, Form, Input, Icon, message, Checkbox } from 'antd'

const FormItem = Form.Item;

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                message.success(`Hi，${values.userName}，您好，您已通过校验，密码为${values.userPwd}`)
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        // console.dir(Form)
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" layout="horizontal" style={{marginTop: 10}}>
                    <Form style={{width: 300}} onSubmit={this.handleSubmit}>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your userName'
                                        },
                                        {
                                            pattern: /^\w+$/g,
                                            message: 'username must be number or letter'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" prefix={<Icon type="user" />} />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password'
                                        },
                                        {
                                            min: 3,
                                            max: 8,
                                            message: 'Password must between 3 and 8 charactors'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入密码" type="password" prefix={<Icon type="lock" />} />
                                )
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float: 'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Login)