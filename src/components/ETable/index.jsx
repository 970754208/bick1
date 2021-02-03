import React, { Component } from 'react'
import { Table } from 'antd'

export default class ETable extends Component {

    handleClick = (record, index) => {
        let rowSelection = this.props.rowSelection;
        if(rowSelection === false || rowSelection === null) return;
        if(rowSelection === 'checkbox') {
            let { selectedItem, selectedRowKeys, selectedIds } = this.props;
            if(selectedIds) {
                let i = selectedIds.indexOf(record.id);
                if(i === -1) {
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                } else {
                    selectedIds.splice(i, 1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        } else {
            let selectedRowKeys = [index],
                selectedItem = record;
            this.props.updateSelectedItem(selectedRowKeys, selectedItem)
        }
    }
    render() {
        console.log(this.props)
        const { columns, dataSource, pagination, selectedRowKeys} = this.props;
        let row_selection = this.props.rowSelection;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRowKeys
        };
        if(row_selection === 'checkbox') {
            rowSelection.type = 'checkbox'
        } else if(row_selection === false || row_selection === null) {
            row_selection = false;
        } else {
            row_selection = 'radio'
        }
        return (
                <Table 
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={pagination}
                    rowSelection={row_selection? rowSelection: null}
                    onRow={(record, index) => ({
                        onClick: () => this.handleClick(record, index)
                    })}
                />
        )
    }
}
