import '../style/messenger.css'

import React, { Component } from 'react';

import Message from '../interface/Message.interface';
import RecoverMessage from './RecoverMessage';
import SendMessage from './SendMessage';
import User from '../interface/User.interface';
import UserList from './UserList';
import close from '../images/close.png'

interface MessengerProps {
    users: User[],
    message: Message[]
    logout: (reason: string) => void,
    sendMessage: (message: Message) => void,
    currentUser?: User
}

export default class Messenger extends Component<MessengerProps> {
    render() {
        return (
            <div className="container clearfix">
                <div className="button-container">
                    <button onClick={this.handleLogout}><img src={close} width={32} /></button>
                </div>
                <UserList users={this.props.users} />
                <div className="chat">
                    <RecoverMessage users={this.props.users} message={this.props.message} />
                    <SendMessage sendMessage={this.props.sendMessage} currentUser={this.props.currentUser} />
                </div>
            </div >
        )
    }

    handleLogout = () => {
        this.props.logout('')
    }
}





