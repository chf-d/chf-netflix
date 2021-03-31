import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Search from './Search.jsx';
import Favorites from './Favorites.jsx';

export default class User extends Component {

    constructor(props) {
        super(props)

        this.state = {
            flag: 'Search'
        }
    }


    changeFlage = (flag) => {

        this.setState({ flag: flag })
    }

    show = () => {
        if (this.state.flag == 'Search') {
            return <Search user={this.props.user} />
        }
        else {
            return <Favorites user={this.props.user} />
        }
    }


    render() {
        return (
            <div className='user'>

                <h1 id='search' >hello {this.props.user.name} Please Search For Movie</h1>
                <button onClick={() => this.changeFlage('Favorites')}>Favorites</button>
                <button onClick={() => this.changeFlage('Search')}>Search</button>
                <Link to='/'><button>Exit</button></Link>

                {this.show()}

            </div>
        )
    }
}
