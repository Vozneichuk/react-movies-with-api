import React, {Component} from 'react'

class MovieItem extends Component {
  state = {
    willWatch: false
  }

  // componentWillUnmount(){
  //   console.log('WillUnmount', this.props.movie.title)
  // }

  addToWillWatch = () => {
    this.setState({
      willWatch: true
    })
    this.props.addMovieToWillWatch(this.props.movie)
  }

  removeFromWillWatch = () => {
    this.setState({
      willWatch: false
    })
    this.props.deleteMovieFromWillWatch(this.props.movie)
  }

  render(){
    const {movie, deleteMovie} = this.props
    return(
      <div className='card'>
        <img 
          style={{height: 300}}
          className='card-img-top' 
          src={`https://image.tmdb.org/t/p/w500${movie.backgrop_path || movie.poster_path}`} 
          alt=''
        />
        <div className='card-body'>
          <h6 className='card-title'>{movie.title}</h6> 
          <div className='d-flex justify-content-between align-items-center'>
            <p className='mb-0'>Raiting: {movie.vote_average}</p>
            <button 
              type='button'
              className={this.state.willWatch ?  'btn btn-success' : 'btn btn-secondary'}
              onClick={this.state.willWatch ? this.removeFromWillWatch : this.addToWillWatch}
            >
              {this.state.willWatch ? 'Remove Will Watch' : 'Add Will Watch'}
            </button>
          </div>
          <button type='button' onClick={deleteMovie.bind(null, movie)}>Delete Movie</button>
        </div>
      </div>
    )
  }
}

export default MovieItem