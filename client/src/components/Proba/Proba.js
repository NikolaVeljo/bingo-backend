import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../../store/tikcets/action";
import { updateGame } from "../../store/game/action";

export default function Proba() {
	const dispatch = useDispatch();

	const [numbers, setNumbers] = useState([]);
	const [roundNumber, setRoundNumber] = useState(null);
	const [luckyNumbersPosition, setLuckyNumbersPosition] = useState([]);

	const values = [
		0,
		0,
		0,
		0,
		0,
		25000,
		15000,
		7500,
		3000,
		1250,
		700,
		350,
		250,
		175,
		125,
		100,
		90,
		80,
		70,
		60,
		50,
		35,
		25,
		20,
		15,
		12,
		10,
		8,
		7,
		6,
		5,
		4,
		3,
		2,
		1,
	];

	const wss = useRef(null);

	useEffect(() => {
		wss.current = new WebSocket(
			"wss://bingo-frontend-iku9k.ondigitalocean.app/bingo-websocket"
		);
		wss.current.onopen = () => console.log("ws opened");
		wss.current.onclose = () => console.log("ws closed");

		return () => {
			wss.current.close();
		};
	}, []);

	useEffect(() => {
		if (!wss.current) return;
		wss.current.onmessage = (e) => {
			const message = JSON.parse(e.data);

			setNumbers(message.numbers);
			setRoundNumber(message.id);
			setLuckyNumbersPosition(message.luckyNumbersPosition);
			
        };
        
        dispatch(
            updateGame({
                gameNumbers: numbers,
                luckyNumbersPosition: luckyNumbersPosition,
                currentRoundId: roundNumber,
            })
        );
	}, [numbers]);

	useEffect(() => {
		dispatch(
			updateTicket({
				roundId: roundNumber,
			})
		);
	}, [roundNumber]);

	return (
		<div className='grid-container-drum'>
			<div className='header-drum'>
				<h1> Lucky 6</h1>
				<div>Round: {roundNumber} </div>
			</div>
			{numbers && numbers.length === 0 ? (
				<div className='lastRoundNumbers'>
					{/* iz api poziva rezultati za prethodno kolo */}
				</div>
			) : (
				<>
					<div className='drum' key={numbers[numbers.length - 1]}>
						<img
							className='ball-animation'
							key={numbers[numbers.length - 1]}
							src={
								numbers &&
								`./numbers/${numbers[numbers.length - 1]}.png`
							}
							alt={numbers[numbers.length - 1]}
						/>
					</div>
					{values &&
						values.map((value, key) => {
							return (
								<div
									className={
										key < 5
											? `gold-ring-${key}`
											: "number-div silver-ring"
									}
									key={key}
								>
									{luckyNumbersPosition &&
										luckyNumbersPosition.map((luckyNum) => {
											if (luckyNum === key) {
												return (
													<div className='div-lucky-number-position' />
												);
											}
										})}
									<div key={key}>
										{numbers && numbers[key] ? (
											<img
												key={numbers[key]}
												src={
													numbers.length === key + 1
														? numbers &&
														  `./numbers/ball.png`
														: numbers &&
														  `./numbers/${numbers[key]}.png`
												}
												alt={key}
											/>
										) : (
											<img
												key={numbers[key]}
												src={
													numbers &&
													`./numbers/ball.png`
												}
												alt={key}
											/>
										)}
									</div>

									<div className='odds'>
										{value !== 0 && value}
									</div>
								</div>
							);
						})}
				</>
			)}
		</div>
	);
}
