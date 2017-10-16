import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Movie from './Movie.jsx';
import TopMenu from '../../components/TopMenu.jsx';
import Search from '../../components/Search.jsx';
import Header from '../Header.jsx';
import FooterBlock from '../../components/FooterBlock.jsx';
import { getMovies, searchMovieByTitle } from '../../actions/movies';
import { fetchAuthorizedUser } from '../../actions/user';

class MoviesList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
			isSearch: false,
			toggleLike: false
		};
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.searchFilm = this.searchFilm.bind(this);
	}
	componentDidMount() {
		this.props.listMovies();	
	}

	handleFilterChange(ev) {
 		this.setState({ filter: ev.target.value.toLowerCase()});
	}
	searchFilm(ev) {
		ev.preventDefault();
		const { filter } = this.state;
		this.props.searchMovie(filter);
		this.setState({ isSearch: true });
	}

	render() {
		const { movies, searchingMovie, username } = this.props;
		const { isSearch } = this.state;

		if (!username) {
			return <Redirect to="/login" />
		}

		const moviesList = movies.map(movie => (
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
		
		const moviesBlock = isSearch ? 
		[
			<div className="list-movies">
				<Movie
		         key={searchingMovie._id}
		         movieId={searchingMovie._id}
		         date = {searchingMovie.date}
		         url = {searchingMovie.url}
		         title = {searchingMovie.title}
		         likes = {searchingMovie.likes}
		         comments = {searchingMovie.comments}
		      />
			</div>
		] : 
		<div className="list-movies">
			{moviesList}
		</div>;

		return (
			<div className="wrapper">
				<Header />
				<main>
					<div className="menu-container">
						<TopMenu />
						<Search
							handleFilterChange={this.handleFilterChange}
							searchFilm={this.searchFilm}
						/>
					</div>
					{moviesBlock}
				</main>
				<FooterBlock />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		movies: state.movies,
		searchingMovie: state.movieByTitle,
		username: state.user.username
	};
};

const mapDispatchToProps = dispatch => {
	return {
		listMovies() {
			dispatch(getMovies())
		},
		searchMovie(title){
			dispatch(searchMovieByTitle(title))
		} 
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
