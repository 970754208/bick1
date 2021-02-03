import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;

export default {
    formateDate(time) {
        if(!time) return;
        function formate(data) {
            return data < 10 ? '0'+data : data;
        }
        let myDate = new Date(time),
            y = myDate.getFullYear(),
            mon = myDate.getMonth() + 1,
            date = myDate.getDate(),
            h = myDate.getHours(),
            min = myDate.getMinutes(),
            s = myDate.getSeconds();
        mon =  formate(mon);
        date = formate(date);
        h = formate(h);
        min = formate(min);
        s = formate(s);
        return y + '-' + mon + '-' + date + ' ' + h + ':' + min + ':' + s;
    },
    pagination(data, callback) {
        // console.log(data);
        return {
            current: data.result.current,
            pageSize: data.result.pageSize,
            total: data.result.total,
            onChange: current => {
                callback(current)
            }
        }
    },
    getOptions(list) {
        const options = [];
        if(list.map(item=>item.name).indexOf('全部') === -1) {
            options.push(<Option value="" key="-1">全部</Option>)
        }
        list.forEach(item => {
            options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
        if(selectedIds) {
            this.setState({selectedRowKeys, selectedItem, selectedIds})
        } else {
            this.setState({selectedRowKeys, selectedItem})
        }
    }
}