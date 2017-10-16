import React from 'react';

export default function LikeHeartIcon({ handleChangeLike, countLikes }) {
	return (
		<p className="like-count">
			<svg onClick={handleChangeLike} enableBackground="new 0 0 128 128" height="24px" id="Layer_1" version="1.1" viewBox="0 0 128 128" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M90.8,15C70.7,15,64,31,64,31s-6.7-16-26.8-16S6,31,6,49.3c0,34.3,58,64,58,64s58-29.7,58-64  C122.1,31,110.9,15,90.8,15z M90.6,91c-11.1,8.9-22.2,15.4-26.5,17.7c-4.3-2.4-15.5-8.8-26.6-17.8C24.9,80.8,10,65.4,10,49.3  c0-8.3,2.5-15.9,7.1-21.4C22,22.1,29,19,37.3,19c17.2,0,23,13.4,23.1,13.5l3.7,8.8l3.7-8.8C68,32,73.8,19,90.8,19  c8.3,0,15.2,3.1,20.1,8.9c4.6,5.5,7.1,13.1,7.1,21.4C118.1,65.4,103.1,80.9,90.6,91z" fill="#0d5f69"/></svg>		        
			{countLikes}
		</p>
	);
}
