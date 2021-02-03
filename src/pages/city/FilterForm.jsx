import React, { Component } from 'react'
import { Form, Select, Button } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {
    render() {
        console.log(this.props)
        let { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id', {
                            rules: [
                                {
                                    isrequired: true,
                                    message: '请选择城市'
                                }
                            ]
                        })(
                            <Select placeholder="全部" style={{width: 100}}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode', {
                            rules: [
                                {
                                    isrequired: true,
                                    message: '请选择用车模式'
                                }
                            ]
                        })(
                            <Select placeholder="全部" style={{width: 120}}>
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator('op_mode', {
                            rules: [
                                {
                                    isrequired: true,
                                    message: '请选择营运模式'
                                }
                            ]
                        })(
                            <Select placeholder="全部" style={{width: 80}}>
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权模式">
                    {
                        getFieldDecorator('auth_status')(
                            <Select placeholder="全部" style={{width: 80}}>
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create('')(FilterForm);


