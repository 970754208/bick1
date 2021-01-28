import React, { Component } from 'react'
import { Card, Tabs, Icon, message } from 'antd'
import './ui.less'
const { TabPane } = Tabs;

export default class Tab extends Component {
    state = {
        panes: [
            {
                title: 'tab1',
                content: 'content1',
                key: '1'
            },
            {
                title: 'tab2',
                content: 'content2',
                key: '2'
            },
            {
                title: 'tab3',
                content: 'content3',
                key: '3'
            },
        ],
        activeKey: '2',
        
    }
    newTabIndex = 0
    handleChange = key => {
        message.info('hi, 您选择的页签' + key)
    }
    handleChange3 = key => {
        this.setState({activeKey: key})
    }
    handleEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        let {panes} = this.state;
        const activeKey = `newTab${this.newTabIndex}`;
        panes.push({title: `newTab${this.newTabIndex}`, content: `content ${this.newTabIndex}`, key: activeKey});
        this.setState({activeKey, panes})
        this.newTabIndex++;
    }
    remove = targetKey => {
        let { activeKey, panes } = this.state;
        let lastIndex;
        // console.log(targetKey, activeKey)
        panes.forEach((item, index) => {
            if(targetKey === item.key) {
                lastIndex = index - 1;
            }
        })
        // console.log(panes)
        panes = panes.filter(item => !(targetKey == item.key));
        // console.log(panes)
        if(targetKey === activeKey && panes.length) {
            if(lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key
            }
        }
        this.setState({panes, activeKey})
    }
    render() {
        return (
            <div>
                <Card className="card-wrap" title="页签">
                    <Tabs defaultActiveKey='3' onChange={this.handleChange}>
                        <TabPane tab="tab1" key={1}>
                            content 1
                        </TabPane>
                        <TabPane tab="tab2" key={2}>
                            content 2
                        </TabPane>
                        <TabPane tab="tab3" key={3}>
                            content 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card className="card-wrap">
                    <Tabs defaultActiveKey='2' type="card" tabPosition="bottom">
                        <TabPane tab={<span><Icon type="car" /> tab1</span>} key={1}>
                            content 1
                        </TabPane>
                        <TabPane tab="tab2" key={2} disabled>
                            content 2
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit" /> tab1</span>} key={3}>
                            content 3
                        </TabPane>
                    </Tabs>
                </Card>
                <Card className="card-wrap" title="遍历出来的页签" >
                    <Tabs activeKey={this.state.activeKey} 
                        type="editable-card"
                        onChange={this.handleChange3}
                        onEdit={this.handleEdit}
                    >
                        {
                            this.state.panes.map(item => {
                                return <TabPane tab={item.title} key={item.key}>
                                        {item.content}
                                    </TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
