import React, { Component } from 'react'
import { Input, Form, Select, Checkbox, DatePicker, Button } from 'antd'
import Utils from '../../utils/utils'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class BaseForm extends Component {

    handleSubmit = () => {
        let params = this.props.form.getFieldsValue();
        this.props.filterSubmit(params)
    }

    handleReset = () => {
        this.props.form.resetFields();
    }
    
    initFormList = () => {
        // console.log(this.props)
        const formList = this.props.formList,
            {getFieldDecorator} = this.props.form,
            formItemList = [];
        formList.forEach((item, index) => {
            const {field, width, placeholder, initialValue, label} = item;
            if(item.type === "INPUT") {
                const INPUT = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator(field, {
                            initialValue
                        })(
                            <Input placeholder={placeholder} width={{width}} />
                        )
                    }
                </FormItem>
                formItemList.push(INPUT);
            } else if(item.type === "CHECKBOX") {
                const CHECKBOX = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator(field, {
                            valuePropName: 'checked',
                            initialValue
                        })(
                            <Checkbox>{label}</Checkbox>
                        )
                    }
                </FormItem>
                formItemList.push(CHECKBOX);
            } else if(item.type === "SELECT") {
                const SELECT = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator(field, {
                            initialValue
                        })(
                            <Select style={{width: width}} placeholder={placeholder}>
                                {Utils.getOptions(item.list)}
                            </Select>
                        )
                    }
                </FormItem>
                formItemList.push(SELECT);
            } else if(item.type === '起止时间') {
                const time = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator(field, {
                            initialValue
                        })(
                            <RangePicker />
                        )
                    }
                </FormItem>
                formItemList.push(time);
            }else if(item.type === 'DATE') {
                const date = <FormItem label={label} key={field}>
                    {
                        getFieldDecorator(field, {
                            initialValue
                        })(
                            <DatePicker placeholder={placeholder} />
                        )
                    }
                </FormItem>
                formItemList.push(date);
            }
        })
        return formItemList;
    }

    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleSubmit}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create()(BaseForm);