import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMovies } from '../actions/movies';
import { Link } from 'react-router-dom';
import TopMenu from '../components/TopMenu.jsx';
import Header from './Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';
import Movie from './MoviesList/Movie.jsx';

class MostLiked extends Component {
	constructor(props) {
		super(props);
		this.sortElement = this.sortElement.bind(this);
	}
	sortElement(a, b) {
	    return b.likes - a.likes;
	}
	componentDidMount() {
		this.props.listMovies();	
	}
	render() {
	  	const { movies } = this.props;
	  	const sortMovies = [...movies].sort(this.sortElement);

	  	const sortMoviesList = sortMovies.map(movie => (
	        <Movie
	          key={movie._id}
	          movieId={movie._id}
	          date = {movie.date}
	          url = {movie.url}
	          title = {movie.title}
	          likes = {movie.likes}
	          comments = {movie.comments}
	        />
	      )
		);

	    return (
	    	<div className="wrapper">
				<Header />
		    	<main>
		    		<div className="menu-container">
						<TopMenu />
					</div>
					<h1>Most liked movies</h1>
					<div className="list-movies">
						{sortMoviesList}
					</div>
				</main>
				<FooterBlock />
			</div>
	
	    );
	  }
}

const mapStateToProps = state => {
	return {
		movies: state.movies
	};
};
const mapDispatchToProps = dispatch => ({
	listMovies() {
		dispatch(getMovies())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(MostLiked);
