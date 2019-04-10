import React, { Component } from 'react';

import User from '../interface/User.interface';
import online from '../images/switch.png'

interface UserListProps {
    users: User[]
}

export default class UserList extends Component<UserListProps> {
    render() {
        return (
            <div className="people-list" id="people-list">
                <ul className="list">
                    {this.props.users.map(user => {
                        return <li className="clearfix" key={user.uid}>
                            <div className="about">
                                <div className="name">{user.name}</div>
                                <img src={online} />
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}