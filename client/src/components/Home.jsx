import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios';

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {

            username: '',
            password: ''
        }
    }

    validUserName = (e) => {
        this.setState({ username: e.target.value })
    }

    validPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    // Checks if the details entered exist in db
    enter = () => {

        axios.get(`/api/findUser/${this.state.username}`)
            .then(res => {

                if (res.data.length === 0) {
                    alert('Incorrect user or password')
                }
                else {

                    if (this.state.password == res.data[0].password) {

                        this.props.history.push(`/${this.state.username}`)

                    } else {
                        alert('Incorrect user or password')
                    }
                }
            })
    }

    render() {
        return (
            <div className='Home'>

                <h1>Welcome to<br /> CHF - Netflix</h1>
                <h2>Log in.</h2>

                <input onChange={this.validUserName} placeholder='User Name' /><br />
                <input onChange={this.validPassword} placeholder='Password' /><br />
                <button id='enter' onClick={this.enter}>ENTER</button><br />
                <Link id='register' to='/register'>Create a new user</Link><br />
            </div>
        )
    }
}

export default withRouter(Home);