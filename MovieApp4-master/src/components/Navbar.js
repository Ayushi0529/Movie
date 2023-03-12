import React, { Component } from "react";

import { connect } from "react-redux";
import { addMovieToList, handleMovieSearch } from "../actions";
import { search } from "../reducers";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //ye to raha    imse keval searchtext hai search result nahi hai
      searchText: "",
    };
  }

  handleAddToMovies = (movie) => {
    this.props.dispatch(addMovieToList(movie));
    this.setState({
      // state kaha hai idhar ?
      showSearchResults: true,
    });
  };

  handleChange = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };
  handleSearch = () => {
    const { searchText } = this.state;

    this.props.dispatch(handleMovieSearch(searchText));
  };
  //cool? bro tumne kya change kiya//search ki jagah storekiya hai//yes okay
  render() {
    // console.log('blah',this.props);
    const { showSearchResults, result: movie } = this.props.search;
    console.log("in navbar search", this.props);
    return (
      <div className="nav">
        <div className="search-container">
          <input onChange={this.handleChange} />
          <button id="search-btn" onClick={this.handleSearch}>
            Search
          </button>
          {showSearchResults && (
            <div className="search-results">
              <div className="search-result">
                <img src={movie.Poster} alt="search-pic" />

                <div className="movie-info">
                  <span>{movie.Title}</span>
                  <button onClick={() => this.handleAddToMovies(movie)}>
                    Add To Movies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// class NavbarWrapper extends React.Component{
//     render(){
//         return (
//             <StoreContext.Consumer>
//              {(store)=><Navbar dispatch={store.dispatch}  store={this.props.search}/>}
//             </StoreContext.Consumer>
//         )
//     }
// }

function mapStateToProps({ search }) {
  return {
    search,
  };
}
export default connect(mapStateToProps)(Navbar);
