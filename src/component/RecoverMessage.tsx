import React, { Component } from 'react';

import Message from '../interface/Message.interface';
import User from '../interface/User.interface';

interface RecoverMessageProps {
    users: User[],
    message: Message[]
}

export default class RecoverMessage extends Component<RecoverMessageProps> {

    readonly scrollDiv = React.createRef<HTMLDivElement>()

    render() {
        return (
            < div className="chat-history" >
                <ul>
                    {this.props.message.map(message => {
                        const author = this.props.users.find(user => user.uid === message.authorId)
                        return <li className="clearfix" key={message.authorId + message.date + message.payload}>
                            <div className="message-data align-right">
                                <span className="message-data-time" >{new Date(message.date).toDateString}</span> &nbsp; &nbsp;
                        <span className="message-data-name" >{author ? author.name : 'No name'}</span> <i className="fa fa-circle me"></i>
                            </div>
                            <div className="message other-message float-right">{message.payload}</div>
                        </li>
                    })}
                </ul>
                <div ref={this.scrollDiv} />
            </div>
        )
    }

    componentDidUpdate() {
        if (this.scrollDiv.current) {
            this.scrollDiv.current.scrollIntoView({
                behavior: 'auto'
            })
        }
    }
}