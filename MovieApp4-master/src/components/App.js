import React from 'react';
import  {connect} from 'react-redux';
import {data} from '../data';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import {addMovies,setShowFavourite} from '../actions';

  
class App extends React.Component { 
  
  componentDidMount(){
    // const  {store}=this.props;
    
    // store.subscribe(()=>{
    //    console.log('UPDATED');
    //    this.forceUpdate();
    // });
    // make api calls
    // dispatch action
    // store.dispatch(addMovies(data));
     this.props.dispatch(addMovies(data));
    //console.log('STATE',this.props.store.getState());
  }

  isMovieFavourite=(movie)=>{  
    const {movies}=this.props;

    
    const index=movies.favourites.indexOf(movie);
    if(index!==-1){
      // found the movie
      return true;
    }

    return false;

  }
   
  onChangeTab=(val)=>{
    
    this.props.dispatch(setShowFavourite(val))
  }
  render(){
    console.log("hey123",this.props);
    const{movies,search}=this.props; //{list:[],favourite:[]}

     console.log('Hey',search); 
     const { list,favourites,showFavourites }=movies 

   console.log('RENDER',this.props);
   const displayMovies=showFavourites?favourites:list;
   
   return (
    <div className="App">
      <Navbar   search={search}/>
      <div className="main">

        <div className="tabs">
          <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={()=>this.onChangeTab(false)} > Movies</div>
          <div  className={`tab ${showFavourites?'active-tabs':''}`}  onClick={()=>this.onChangeTab(true)}>Favourites</div>
        </div>
        <div className="list">
         {displayMovies.map((movie,index)=>(
        
           <MovieCard 
           movie={movie} 
           key={`movies-${index}`} 
           dispatch={this.props.dispatch}
           isFavourite={this.isMovieFavourite(movie)}
           />   

         ))} 
        </div>
         
     {displayMovies.length===0?<div className="no-movies">No movies to display</div>:null}
        </div>   
    </div>
  );
   
           }
  }
  
// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {(store)=><App store={store} />}
//       </StoreContext.Consumer>
//     )
//   }
// }
function mapStateToProps(state){
  return {
     movies:state.movies,
     search:state.movies
  }
};

 const connectedAppComponent= connect(mapStateToProps)(App); 

export default connectedAppComponent; 
