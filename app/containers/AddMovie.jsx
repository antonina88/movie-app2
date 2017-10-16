import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Header from './Header.jsx';
import FooterBlock from '../components/FooterBlock.jsx';
import TopMenu from '../components/TopMenu.jsx';
import PlayIcon from '../components/Icons/PlayIcon.jsx';
import { fetchAddMovie } from '../actions/movies';
import { fetchAuthorizedUser } from '../actions/user';

class AddMovie extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			url: '',
			open: false
		};
		this.updateUrl = this.updateUrl.bind(this);
		this.updateTitle = this.updateTitle.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.updateContent = this.updateContent.bind(this);
		this.createMovie = this.createMovie.bind(this);
		this.clearForm = this.clearForm.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	updateUrl(event) {
		this.setState({url: event.target.value});
		const previewBlock = document.querySelector('.cover-preview');
		previewBlock.style = `background: url(${event.target.value}) top center/250px auto no-repeat`;
	}

	updateTitle(event) {
		this.setState({title: event.target.value});
	}

	updateContent(event) {
		this.setState({description: event.target.value});
	}

	clearForm() {
		this.setState({
			url: '',
			title: '',
			description: ''
		});
		const previewBlock = document.querySelector('.cover-preview');
		previewBlock.style = `background: none`;
	}

	createMovie(event) {
		event.preventDefault();
		const { title, description, url } = this.state;

		this.props.addMovie(title, description, url);
		this.clearForm();
		this.setState({open: true});
	}

	handleClose(){
	    this.setState({open: false});
	};

	render() {
		const {url, title, description, open} = this.state;

		if (!this.props.username) {
			return <Redirect to="/login" />
		}

		const actions = [
		<FlatButton
	        label="Закрыть"
	        primary={true}
	        onClick={this.handleClose}
	      />
	    ];

	    const alert = open? [
	    	<Dialog
			    actions={actions}
			    modal={false}
			    open={this.state.open}
			>
			Данные сохранены
			</Dialog>
	    ]: null

		return (
			<div className="wrapper">
				<Header />
				<div className="menu-container">
					<TopMenu />
				</div>
				<div className="add-movie">
					<div className="cover-preview">&nbsp;</div>
					{alert}
					<form>
						<input type="text" placeholder="Movie title" value={title} onChange={this.updateTitle} />
						<textarea placeholder="Movie description" value={description} onChange={this.updateContent}></textarea>
						<input type="text" placeholder="Cover url" value={url} onChange={this.updateUrl} />
						<button className="publish-movie" onClick={this.createMovie} >
							<PlayIcon />
							Publish movie
						</button>
					</form>
				</div>
				<FooterBlock />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		movies: state.movies,
		username: state.user.username
	};
};
const mapDispatchToProps = dispatch => ({
	addMovie(title, description, url) {
		dispatch(fetchAddMovie(title, description, url))
	},
	getAuthorizedUser(){
    	dispatch(fetchAuthorizedUser())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);
