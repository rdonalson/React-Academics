/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './game.scss';

/**
 * PlayNumber component
 * @param {object} props
 * @returns {JSX.Element}
 * @memberof StarMatch
 * @description This function is used to render the number buttons
 * */
const StarsDisplay = (props) => (
	<>
		{utils.range(1, props.count).map((starId) => (
			<div key={starId} className='star' />
		))}
	</>
);

/**
 * PlayNumber component
 * @param {object} props
 * @returns {JSX.Element}
 * @memberof StarMatch
 * @description This function is used to render the number buttons
 * */
const PlayNumber = (props) => (
	<button
		className='number'
		style={{ backgroundColor: colors[props.status] }}
		onClick={() => props.onClick(props.number, props.status)}
	>
		{props.number}
	</button>
);

/**
 * StarMatch component
 * @param {object} props
 * @returns {JSX.Element}
 * @memberof StarMatch
 * @description This function is used to render the number buttons
 * */
const PlayAgain = (props) => (
  <div className='game-done'>
    <div
      className='message'
      style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}
    >
      {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
    </div>
		<button onClick={props.onClick}>Play Again</button>
	</div>
);

/**
 * StarMatch component Custom Hook
 * @param {object} props
 * @returns {JSX.Element}
 * @memberof StarMatch
 * @description This function is used to render the number buttons
 * */
const useGameState = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
	const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
	const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(30);
  
	useEffect(() => {
		if (secondsLeft > 0 && availableNums.length > 0) {
			const timerId = setTimeout(() => {
				setSecondsLeft(secondsLeft - 1);
			}, 1000);
			return () => clearTimeout(timerId);
		}
  });
  
  const setGameState = (newCandidateNums) => {
		// set the new candidateNums array
		if (utils.sum(newCandidateNums) !== stars) {
			setCandidateNums(newCandidateNums);
		} else {
			// if the sum of the candidateNums array is equal to the stars, remove the numbers from the availableNums array
			const newAvailableNums = availableNums.filter(
				(n) => !newCandidateNums.includes(n)
			);
			setStars(utils.randomSumIn(newAvailableNums, 9));
			setAvailableNums(newAvailableNums);
			setCandidateNums([]);
		}
	};
  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
}

/**
 * StarMatch component
 * @param {object} props
 * @returns {JSX.Element}
 * @memberof StarMatch
 * @description This function is used to render the number buttons
 * */
const Game = (props) => {

  const {
    stars,
    availableNums,
    candidateNums,
    secondsLeft,
    setGameState,
  } = useGameState();

	const candidatesAreWrong = utils.sum(candidateNums) > stars;
	const gameStatus =
    availableNums.length === 0
      ? 'won'
      : secondsLeft === 0 ? 'lost' : 'active';

	/**
	 * @function
	 * @name handleClick
	 * @param {number} number
	 * @param {string} status
	 * @memberof StarMatch
	 * @description This function is used to handle the click event
	 * */
	const numberStatus = (number) => {
		// if the number is in the candidates array, return 'used'
		if (!availableNums.includes(number)) {
			return 'used';
		}
		// if the number is in the candidate array, return 'candidate'
		if (candidateNums.includes(number)) {
			return candidatesAreWrong ? 'wrong' : 'candidate';
		}
		// if the number is not in the candidate array, return 'available'
		return 'available';
	};

	/**
	 * @function
	 * @name handleClick
	 * @param {number} number
	 * @param {string} status
	 * @memberof StarMatch
	 * @description This function is used to handle the click event
	 * */
	const onNumberClick = (number, currentStatus) => {
		if (gameStatus !== 'active' || currentStatus === 'used') {
			return;
		}
		// if the number is already in the candidateNums array, remove it
		const newCandidateNums =
			currentStatus === 'available'
				? candidateNums.concat(number)
				: candidateNums.filter((cn) => cn !== number);

    setGameState(newCandidateNums);
	};

	/**
	 * @function
	 * @name render
	 * @memberof StarMatch
	 * @description This function is used to render the component
	 * */
	return (
		<div className='game'>
			<div className='help'>
				Pick 1 or more numbers that sum to the number of stars
			</div>
			<div className='body'>
				<div className='left'>
					{gameStatus !== 'active' ? (
						<PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
					) : (
						<StarsDisplay count={stars} />
					)}
				</div>
				<div className='right'>
					{utils.range(1, 9).map((number) => (
						<PlayNumber
							key={number}
							status={numberStatus(number)}
							number={number}
							onClick={() => onNumberClick(number, numberStatus(number))}
						/>
					))}
				</div>
			</div>
			<div className='timer'>Time Remaining: {secondsLeft}</div>
		</div>
	);
};

const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)}/>;
};

/**
 * Color Theme
 * @type {object}
 * */
const colors = {
	available: 'lightgray',
	used: 'lightgreen',
	wrong: 'lightcoral',
	candidate: 'deepskyblue',
};

/**
 * Math science
 * @type {object}
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @description Returns a random number between min and max
 * @example utils.random(1, 9) //=> an integer between 1 to 9
 * @example utils.random(1, 9, true) //=> a float between 1 to 9
 * */
const utils = {
	// Sum an array
	sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

	// create an array of numbers between min and max (edges included)
	range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

	// pick a random number between min and max (edges included)
	random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

	// Given an array of numbers and a max...
	// Pick a random sum (< max) from the set of all available sums in arr
	randomSumIn: (arr, max) => {
		const sets = [[]];
		const sums = [];
		for (let i = 0; i < arr.length; i++) {
			for (let j = 0, len = sets.length; j < len; j++) {
				const candidateSet = sets[j].concat(arr[i]);
				const candidateSum = utils.sum(candidateSet);
				if (candidateSum <= max) {
					sets.push(candidateSet);
					sums.push(candidateSum);
				}
			}
		}
		return sums[utils.random(0, sums.length - 1)];
	},
};
/**
 * @type {object}
 * @description Main StarMatch Component
 * @example <StarMatch />
 * */
export default StarMatch;
