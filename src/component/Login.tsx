import React, { Component } from 'react';

interface LoginProps {
    connection: (username: string) => void
}

interface LoginState {
    username: string
}

export default class Login extends Component<LoginProps, LoginState> {
    state: LoginState = {
        username: ''
    }

    render() {
        return (
            <div>
                <input type="text" name="username" value={this.state.username} onChange={this.changeUsername}></input>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }

    changeUsername = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({ username: e.currentTarget.value })
    }

    login = () => {
        this.props.connection(this.state.username)
    }
}