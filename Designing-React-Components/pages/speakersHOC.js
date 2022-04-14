import React from 'react';
import WithData from '../src/components/WithData';

const Speakers = ({ speakers }) => {
	return (
		<div>
			{speakers.map(({ imageSrc, name }) => {
				return (
					<img src={`/images/${imageSrc}.jpg`} alt={name} key={imageSrc}></img>
				);
			})}
		</div>
	);
};


export default WithData(2)(Speakers);;
