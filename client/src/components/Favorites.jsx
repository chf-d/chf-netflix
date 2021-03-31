import React, { Component } from 'react'
import axios from 'axios';

export default class Favorites extends Component {

    constructor(props) {
        super(props)

        this.state = {

            user: '',
            isLoaded: false,
            museEnter: false,
            id: ''

        }
    }

    componentDidMount() {
        this.getUser()
    }


    getUser = () => {

        axios.get(`/api/findUser/${this.props.user.username}`)
            .then((res) => {
                this.setState({ user: res.data, isLoaded: true })
            })
    }

    MouseEnter = (id) => {
        this.setState({ museEnter: true, id: id })
        document.getElementById(id).classList.add('rotateY')
    }

    MouseLeave = (id) => {
        this.setState({ museEnter: false, id: '' })
        document.getElementById(id).classList.remove('rotateY')
    }

    show = (movie, id) => {

        if (this.state.museEnter) {

            if (id == this.state.id) {

                return (

                    <div className='rotateY'>
                        <h2>{movie.Title}</h2>
                        <h4>Year: {movie.Year}</h4><br />
                        <button className='movieButton' onClick={() => this.remove(movie)}>Remove from favorites list</button>
                    </div>
                )
            }
            else {
                return <img src={movie.Poster} />
            }
        }

        else {
            return <img src={movie.Poster} />
        }
    }

    displayMovies = () => {

        if (!this.state.isLoaded) {

            return <h1>Loading...</h1>
        }
        else if (this.state.user[0].movies.length < 1) {

            return <h1>No movies to show</h1>
        }
        else {
            return (
                this.state.user[0].movies.map((movie, i) => {

                    return (
                        <div id={i} className='movie' onMouseEnter={() => this.MouseEnter(i)} onMouseLeave={() => this.MouseLeave(i)}>

                            {this.show(movie, i)}
                        </div>
                    )
                })
            )
        }
    }

    remove = (movie) => {

        axios.post(`/api/removemovie/${this.props.user._id}`, { movie })

        let updUser = this.state.user[0]
        updUser.movies = updUser.movies.filter(e => e.imdbID != movie.imdbID)

        this.setState({ user: [updUser] })
    }

    render() {
        return (
            <div>
                {this.displayMovies()}
            </div>
        )
    }
}
