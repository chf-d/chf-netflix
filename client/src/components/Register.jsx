import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {

            username: '',
            password: '',
            email: '',
            name: ''
        }
    }

    validUsername = (e) => {
        this.setState({ username: e.target.value.toLowerCase() })
    }

    validPassword = (e) => {
        this.setState({ password: e.target.value.toLowerCase() })
    }

    validEmail = (e) => {
        this.setState({ email: e.target.value })
    }

    validName = (e) => {
        this.setState({ name: e.target.value })
    }

    // add a new user
    submit = (e) => {
        e.preventDefault()

        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name
        }

        axios.post('/api/add', user)

        this.props.history.push('/')
        this.setState({
            username: '',
            password: '',
            email: '',
            name: ''
        })

        this.props.getUsers()
    }

    render() {
        return (
            <div className='register'>

                <form onSubmit={this.submit}>

                    <input type='text'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.validUsername}
                    /><br />

                    <input type='password'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.validPassword}
                    /><br />

                    <input type='email'
                        placeholder='email'
                        value={this.state.email}
                        onChange={this.validEmail}
                    /><br />

                    <input type='text'
                        placeholder='name'
                        value={this.state.name}
                        onChange={this.validName}
                    /><br />

                    <input id='submit' type='submit' value='submit' />

                </form>
            </div>
        )
    }
}

export default withRouter(Register);