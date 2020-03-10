import React, {Component} from 'react';
// import {moviesData} from '../moviesData/moviesData';
import MovieItem from '../movieItem/MovieItem';
import {API_URL, API_KEY_3} from '../moviesData/api';
import MovieTabs from '../MovieTabs/MovieTabs';

class App extends Component{
  constructor(){
    super()
    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'popularity.desc',
      total_pages:'',
      page:''
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.sort_by !== this.state.sort_by) {
      this.getData()
    }
  }

  getData = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        movies: data.results,
        page: data.page,
        total_pages: data.total_pages,
      })
    })
  }
  
  nextPage = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page + 1}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        page: data.page,
        movies: data.results,
        moviesWillWatch: [],
      })
    })
  }

  prevPage = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page - 1}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      this.setState({
        page: data.page,
        movies: data.results,
        moviesWillWatch: [],
      })
    })
  }

  deleteMovie = movie => {
    const newArray = this.state.movies.filter(
      item => item.id !== movie.id
    )
    const newWillWatchAfterDelete = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    )
    this.setState({
      movies: newArray,
      moviesWillWatch: newWillWatchAfterDelete
    })
  }

  addMovieToWillWatch = movie => {
    const updateWillWatch = [...this.state.moviesWillWatch, movie]  // push второго аргумента
    this.setState({
      moviesWillWatch: updateWillWatch
    })
  }

  deleteMovieFromWillWatch = movie => {
    const newWillWatchAfterDelete = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    )
    this.setState({
      moviesWillWatch: newWillWatchAfterDelete
    })
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      page: 1,
      moviesWillWatch: []
    })
  }

  render(){
    return(
      <div className='container mt-3'>
        <div className='row'>
          <div className='col-9'>
            <div className='row mb-4'>
              <div className='col-12'>
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy}/>
              </div>
            </div>
            <div className='row'>
              {this.state.movies.map(movie => {
                return (
                  <div className='col-6 mb-4' key={movie.id} >
                    <MovieItem 
                      movie={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className='col-3'>
            <span>Will Watch: {this.state.moviesWillWatch.length} movies</span>
            <div className='d-flex' style={{flexDirection:'column'}}>
              <span>Total Pages: {this.state.total_pages}</span>
              <span>Current Page: {this.state.page}</span>
            </div>
            <div>
              <button type='button' onClick={this.prevPage} className='btn btn-secondary mr-2' disabled={this.state.page === 1}>Назад</button>
              <button type='button' onClick={this.nextPage} className='btn btn-secondary' disabled={this.state.page === this.state.total_pages}>Вперед</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
