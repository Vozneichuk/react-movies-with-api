import React from 'react'
// import cn from 'classnames'

class MovieTabs extends React.Component{
  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.sort_by !== this.props.sort_by){
  //     return true
  //   }else {
  //     return false
  //   }
  // }

  render(){
    const {sort_by, updateSortBy} = this.props
    // const handleClick = (value) => {
    //   return (event) => {
    //     updateSortBy(value)
    //   }
    // } 
    const handleClick = (value) => () => {
      updateSortBy(value)
    }
    const getClassLink = (value) => {
      return `nav-link ${sort_by === value ? 'active' : ''}`
    }
    
    return(
      <ul className='tabs nav nav-pills'>
        <li className='nav-item'>
          <div 
            onClick={handleClick('popularity.desc')}
            className={getClassLink('popularity.desc')}
            >
            Now playing
          </div>
        </li>
        <li className='nav-item'>
          <div 
            onClick={handleClick('revenue.desc')}
            className={getClassLink('revenue.desc')}
          >
            Upcoming
          </div>
        </li>
        <li className='nav-item'>
          <div 
            onClick={handleClick('vote_average.desc')}
            className={getClassLink('vote_average.desc')}
          >
            Vote average desc
          </div>
        </li>
  
      </ul>
    )
  }
}


export default MovieTabs