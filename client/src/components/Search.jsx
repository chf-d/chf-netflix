import React, { Component } from 'react'
import axios from 'axios';

export default class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            searchError: '',
            isLoaded: false,
            movies: [],
            museEnter: false,
            id: ''
        }
    }

    componentDidMount() {

        this.findMovie('test')
    }

    findMovie = async (Search) => {

        this.setState({ searchError: '', movies: [], isLoaded: false })

        if (Search.length > 2) {

            await axios.get(`https://www.omdbapi.com/?s=${Search}&apikey=970889c1`)
                .then(res => {

                    if (res.data.totalResults > 10) {

                        for (let index = 0; index < Math.ceil(res.data.totalResults / 10); index++) {

                            axios.get(`https://www.omdbapi.com/?s=${Search}&page=${index + 1}&apikey=970889c1`)

                                .then(res => {

                                    this.findImage(res.data.Search)
                                })
                        }
                    }
                    else if (res.data.totalResults <= 10) {

                        let result = []
                        res.data.Search.map(e => {

                            if (e.Poster != "N/A") {
                                result.push(e)
                            }
                        })

                        this.setState({ movies: result, isLoaded: true })
                    }
                    else {

                        this.setState({ searchError: 'movie mot find' })
                    }
                })
        }
        else {
            this.setState({ searchError: 'Please search for at least 3 letters', movies: [], isLoaded: false })
        }
    }

    findImage = (res) => {

        let result = res.filter(e => e.Poster != "N/A")
        let stateMovies = this.state.movies

        result.map(e => {
            stateMovies.push(e)
        })

        this.setState({ movies: stateMovies, isLoaded: true })
    }

    addMovie = (movie, id) => {

        axios.get(`/api/findUser/${this.props.user.username}`)
            .then(res => {

                if (res.data[0].movies === undefined) {

                    axios.post(`/api/addmovie/${this.props.user._id}`, { movie })
                    alert('The movie was successfully added to the favorites list')
                }
                else {
                    let find = 0

                    res.data[0].movies.map(e => {

                        if (e.imdbID === movie.imdbID) {
                            find++
                        }
                    })

                    if (find > 0) {
                        alert('The movie is already on your favorites list')
                    }
                    else {
                        axios.post(`/api/addmovie/${this.props.user._id}`, { movie })
                        alert('The movie was successfully added to the favorites list')
                    }
                }
            })

        this.MouseLeave(id)
    }

    loading = () => {
        if (!this.state.isLoaded) {

            return <h1>Loading...</h1>
        }
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
                        <button className='movieButton' onClick={() => this.addMovie(movie, id)}>Add to favorites list</button>
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

    render() {
        return (
            <div>
                <br />
                <input placeholder='Search movie' type='text' onChange={e => { this.findMovie(e.target.value.toLowerCase()) }} />
                <div>{this.state.searchError}</div>

                {this.loading()}

                { this.state.movies.map((movie, i) => {

                    return (
                        <div id={i} className='movie' onMouseEnter={() => this.MouseEnter(i)} onMouseLeave={() => this.MouseLeave(i)}>
                            {this.show(movie, i)}
                        </div>
                    )
                })}
            </div>
        )
    }
}
