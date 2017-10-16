import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header.jsx';
import MostLiked from './MostLiked.jsx';

import FooterBlock from '../components/FooterBlock.jsx';
import AddComment from '../components/AddComment.jsx';
import Comment from '../components/Comment.jsx';
import TopMenu from '../components/TopMenu.jsx';

import CommentIcon from '../components/Icons/CommentIcon.jsx';
import CalendarIcon from '../components/Icons/CalendarIcon.jsx';
import LikeHandIcon from '../components/Icons/LikeHandIcon.jsx';

import { fetchMovieById } from '../actions/movies';
import { fetchAddComment } from '../actions/comment';
import { fetchLike, fetchRemoveLike } from '../actions/likes';

class MoviePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			changeMovie: '',
			toggleLike: false
		}
		this.handleChangeComment = this.handleChangeComment.bind(this);
		this.addComment = this.addComment.bind(this);
		this.cleareForm = this.cleareForm.bind(this);
		this.handleChangeLike = this.handleChangeLike.bind(this);
	}
	componentDidMount() {
		this.props.getMovie(); 
	}

	handleChangeComment (ev) {
		this.setState({ description: ev.target.value });
	}

	cleareForm (ev) {
		this.setState({ description: '' });
	}

	addComment(ev) {
		ev.preventDefault();
		const { description } = this.state;
		const movieId = this.props.movie._id;
		this.props.createComment(description, movieId);
		this.cleareForm();
	}

	handleChangeLike(ev) {
		ev.preventDefault();
		const { toggleLike } = this.state;
		if (!toggleLike) {
			ev.target.classList.add("active");
			this.props.addLikes();
		}
		if (toggleLike) {
			ev.target.classList.remove("active");
			this.props.removeLike();
		}
		this.setState({ toggleLike: !toggleLike });
	}	

	render() {
		const {	movie } = this.props;
		const { comments, likes } = movie;

		if (comments) {
			var commentList = comments.map(comment => {
				return (
					<Comment
			          key={comment._id}
			          username={comment.username}
			          date={comment.date}
			          description={comment.description}
			        />
				)
			})
		}

		return (
			<div className="wrapper">
				<Header />
				<main className="movie-page">
					<div className="menu-container">
						<TopMenu />
					</div>
					<h1 className="title">{movie.title}</h1>
					<div className="movie-page">
						<img src={movie.url} />
						<div className="content-movie">
							<p className="text">{movie.description}</p>
							<p className="date">
								<CalendarIcon 
									date = {movie.date}
								/>
							</p> 
							<div className="details">
								<LikeHandIcon 
									handleChangeLike = {this.handleChangeLike} 
									countLikes = {likes&&likes.length}
								/>
								<CommentIcon 
									countComments = {comments&&comments.length}
								/>
							</div>
						</div>
					</div>

					<div className="comment-container">
						<AddComment 
							handleChangeComment = {this.handleChangeComment}
							description = {this.state.description}
							addComment = {this.addComment}
						/>
						{commentList}
					</div>
				</main>
				<FooterBlock />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		movie: state.getMovieById
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	const movieId = ownProps.match.params.id;
	return {
		getMovie() {
			dispatch(fetchMovieById(movieId))
		},
		createComment(textComment, id) {
			dispatch(fetchAddComment(textComment, id))
		},
		addLikes() {
			dispatch(fetchLike(movieId))
		},
		removeLike() {
			dispatch(fetchRemoveLike(movieId))
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
