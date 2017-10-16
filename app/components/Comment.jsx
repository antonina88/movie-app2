import React from 'react';

export default function Comment({ username, date, description }) {
	return (
		<div className="comments-list">
			<p className="date">{username}</p>
			<p className="date">{date}</p>
			<p className="textComment">{description}</p>
		</div>
	)
}