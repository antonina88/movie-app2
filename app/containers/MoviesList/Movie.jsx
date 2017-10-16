import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CalendarIcon from '../../components/Icons/CalendarIcon.jsx';
import CommentIcon from '../../components/Icons/CommentIcon.jsx';
import LikeHeartIcon from '../../components/Icons/LikeHeartIcon.jsx';

export default class Movie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggleLike: false
		};
		this.handleChangeLike = this.handleChangeLike.bind(this);
	}
	handleChangeLike(ev) {
		ev.preventDefault();
		const { toggleLike } = this.state;
		if (!toggleLike) {
			ev.target.classList.add("active");
		}
		if (toggleLike) {
			ev.target.classList.remove("active");
		}
		this.setState({ toggleLike: !toggleLike });
	}	

	render() {
	  	const {
	      date,
	      url,
	      title,
	      likes, 
	      comments,
	      movieId
	    } = this.props;

	    return (
	      <div className="movie-container">
	      	<img width="220" src={url} /> <br/>
	      	<h3>
	      		<Link to={`/movie/${movieId}`}>{title}</Link>
			</h3>
			<div className="details">
				<LikeHeartIcon 
				    handleChangeLike = {this.handleChangeLike}
				    countLikes = {likes&&likes.length}
				/>
				<CommentIcon 
					countComments = {comments&&comments.length}
				/>
				<CalendarIcon 
					date = {date} 
				/>
			</div>  
	      </div>
	    );
	  }
}
