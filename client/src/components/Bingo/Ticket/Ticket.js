import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTicket } from "../../../store/tikcets/action";

export default function Ticket() {
	const dispatch = useDispatch();
	const ticketNum = useSelector((state) => state.ticket.ticketNumbers);
	const roundIdNum = useSelector((state) => state.ticket.roundId);
	const gameNumbers = useSelector((state) => state.game.gameNumbers);

	const [stake, setStake] = useState(null);

	const handleStakeChange = (e) => {
		e.preventDefault();
		setStake(e.target.value);
	};

	useEffect(() => {
		dispatch(
			updateTicket({
				stake: stake,
			})
		);
	}, [stake, dispatch]);

	return (
		<Fragment>
			<div className='ticket-header'>
				<div className='ticket-header-round'> Round: {roundIdNum} </div>
				<div className='ticket-header-time'> Time: 05:00 </div>
			</div>
			<div className='ticket-info'>
				<div className='ticket-info-selected-numbers'>
					{ticketNum &&
						ticketNum.map((num) => {
							return (
								<div
									className={
										gameNumbers.includes(num)
											? "ticket-info-selected-number red"
											: "ticket-info-selected-number"
									}
								>
									{num}
								</div>
							);
						})}
				</div>
				<div className='ticket-info-ticket-odds'>
					<input onChange={handleStakeChange} placeholder='Ulog' />
					<button> UPLATI </button>
				</div>
			</div>
		</Fragment>
	);
}
