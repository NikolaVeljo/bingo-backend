import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTicket, updateTicket, getTickets, resetTicket } from "../../../store/tikcets/action";

export default function Ticket() {
	const dispatch = useDispatch();
	const ticketNum = useSelector((state) => state.ticket.ticketNumbers);
	const roundIdNum = useSelector((state) => state.ticket.roundId);
	const gameNumbers = useSelector((state) => state.game.gameNumbers);
	const stake = useSelector((state) => state.ticket.stake);

	const handleStakeChange = (e) => {
		e.preventDefault();
		dispatch(
			updateTicket({
				stake: e.target.value,
			})
		);
	};

	const handleCreateTicket = () => {

		dispatch(
			createTicket({
				ticketNumbers: ticketNum,
				stake: stake,
			})
		);

		dispatch(resetTicket);

		let single = document.querySelectorAll(".number-to-select-single");
		for( let sing of single ){
			sing.classList.remove("selected");
		}

		//dispatch(getTickets());
		
	};

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
					<input onChange={handleStakeChange} placeholder='Ulog' value={stake ? stake : ''}/>
					<button onClick={handleCreateTicket} disabled={ticketNum && ticketNum.length === 6 && stake > 9 && stake < 1001 ? false: true }> UPLATI </button>
				</div>
			</div>
		</Fragment>
	);
}
