import React, { Component } from 'react'
import { Button, Card, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

export default class RichText extends Component {
    state = {
        editorState: '',
        contentState: '',
        showRich: false
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
    }

    handleClear = () => {
        this.setState({
            editorState: '',
            contentState: ''
        })
    }

    handleShow = () => {
        this.setState({
            showRich: true
        })
    }
    render() {
        const { editorState } = this.state;
        // console.log(this.state.editorState, this.state.contentState)
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClear} style={{marginRight: 10}}>清空内容</Button>
                    <Button type="primary" onClick={this.handleShow}>显示内容</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        // toolbarClassName="toolbarClassName"
                        // wrapperClassName="wrapperClassName"
                        // editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRich}
                    onCancel={()=>this.setState({showRich: false})}
                >
                    {draftToHtml(this.state.contentState)}
                </Modal>
            </div>
        )
    }
}
