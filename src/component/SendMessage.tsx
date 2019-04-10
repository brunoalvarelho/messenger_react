import React, { Component, TextareaHTMLAttributes } from 'react';

import Message from '../interface/Message.interface';
import User from '../interface/User.interface';
import { string } from 'prop-types';

interface SendMessageProps {
    sendMessage: (message: Message) => void
    currentUser?: User
}

interface SendMessageState {
    content: string
}

export default class SendMessage extends Component<SendMessageProps, SendMessageState> {

    state: SendMessageState = {
        content: ''
    }

    render() {
        return (
            <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} value={this.state.content} onChange={this.handleMessage}></textarea>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }

    handleMessage = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
        this.setState({ content: e.currentTarget.value })
    }

    sendMessage = () => {
        if (this.state.content !== '') {
            const newMessage: Message = {
                authorId: this.props.currentUser ? this.props.currentUser.uid : '1',
                type: 'text',
                payload: this.state.content,
                date: Date.now()
            }
            this.props.sendMessage(newMessage)
            this.setState({ content: '' })
        }
    }
}