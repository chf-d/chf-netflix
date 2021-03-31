import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import User from './components/User.jsx';
import axios from 'axios';
import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

      users: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  // get Users from the DB and puts them in the state
  getUsers = () => {

    axios.get('/api/findAll')
      .then((res) => {
        this.setState({ users: res.data, isLoaded: true })
      })
  }

  //seting a Route for each user
  setRoute = () => {

    if (!this.state.isLoaded) {
      return (

        <h1>Loading...</h1>
      )
    }
    else {

      return (

        this.state.users.map((user) => {

          return <Route exact path={`/${user.username}`} component={() => { return <User user={user} /> }} />
        })
      )
    }
  }


  render() {
    return (

      <div className="App">

        <Router>
          <Switch>

            <Route exact path='/' component={() => { return <Home /> }} />
            <Route exact path='/register' component={() => { return <Register getUsers={this.getUsers} /> }} />
            {this.setRoute()}

          </Switch>
        </Router>
      </div>
    )
  }
}

