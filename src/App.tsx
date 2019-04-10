import './App.css';

import { FriendLogoutResponse, FriendRenameMessage, FriendSendMessage, LoginResponse, UserLoginResponse } from './interface/Socket.interface'
import React, { Component } from 'react';

import Login from './component/Login'
import Message from './interface/Message.interface';
import Messenger from './component/Messenger'
import User from './interface/User.interface'
import socket from 'socket.io-client'

const urlMessenger = 'https://chat-supdeweb.herokuapp.com'
const io = socket(urlMessenger)

interface AppState {
    users: User[],
    currentUser?: User,
    messages: Message[]
}

class App extends Component<{}, AppState> {
    state: AppState = {
        users: [],
        currentUser: undefined,
        messages: []
    }

    render() {
        const user = this.state.currentUser
        if (user === undefined) {
            return <Login connection={this.login} />
        }
        return <div className="App">
            <Messenger users={this.state.users} logout={this.logout} message={this.state.messages} sendMessage={this.sendMessage} currentUser={this.state.currentUser} />
        </div>
    }

    login = (username: string) => {
        io.emit('login', username)
    }

    logout = (reason: string = '') => {
        io.emit('logout', reason)
    }

    sendMessage = (message: Message) => {
        const messageTosend = {
            sender: message.authorId,
            type: message.type,
            payload: message.payload,
            timestamp: message.date
        }
        io.emit('send.message', messageTosend)
    }

    // listen all event on serveur (socket) and update data
    componentDidMount() {
        io.on('loggedin', ({ user, users }: LoginResponse) => {
            this.setState({ currentUser: user, users: users })
        })

        io.on('user.loggedin', ({ user }: UserLoginResponse) => {
            this.setState(prevState => ({ users: [...prevState.users, user] }))
        })

        io.on('user.loggedout', ({ uid }: FriendLogoutResponse) => {
            this.setState(prevState => ({
                users: prevState.users.filter(
                    (user) => { return user.uid !== uid }
                )
            }))
        })

        io.on('loggedout', () => {
            this.setState({ currentUser: undefined, users: [], messages: [] })
        })

        io.on('user.sent.message', ({ sender, type, payload, timestamp }: FriendSendMessage) => {
            const message = {
                authorId: sender,
                type: type,
                payload: payload,
                date: timestamp
            }
            this.setState(prevState => ({ messages: [...prevState.messages, message] }))
        })

        io.on('user.renamed', ({ user, timestamp }: FriendRenameMessage) => {
            this.setState(prevState => {
                return {
                    users: prevState.users.map(u => {
                        if (u.uid === user.uid) {
                            return user
                        } else {
                            return u
                        }
                    })
                }
            })
        })
    }
}

export default App;
