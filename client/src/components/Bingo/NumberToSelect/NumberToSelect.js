import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../../../store/tikcets/action";

export default function NumberToSelect() {
	const dispatch = useDispatch();

	const [ticket, setTicket] = useState([]);

	const createTicket = (e) => {
		let value = Number(e.target.innerText);

		if (!ticket.includes(Number(e.target.innerText))) {
			setTicket((prevNumbers) => [
				...prevNumbers,
				Number(e.target.innerText),
			]);
			e.target.classList.add("selected");
		} else {
			setTicket(ticket.filter((item) => item !== value));
			e.target.classList.remove("selected");
		}
	};

	const preventUserClick = (ticket) => {
		let single = document.querySelectorAll(".number-to-select-single");

		if (ticket.length >= 6) {
			for (let sing of single) {
				if (sing.classList.length === 1) {
					sing.style.pointerEvents = "none";
					sing.style.pointer = "none";
				}
			}
		} else {
			for (let sing of single) {
				sing.style.pointerEvents = "auto";
				sing.style.pointer = "pointer";
			}
		}
	};

	const createNumbersElement = () => {
		const numbersDOMElements = [];
		for (let i = 1; i < 49; i++) {
			numbersDOMElements.push(
				<div
					className='number-to-select-single'
					key={i}
					onClick={createTicket}
				>
					{i}
				</div>
			);
		}

		return numbersDOMElements;
	};

	useEffect(() => {
		preventUserClick(ticket);
		dispatch(
			updateTicket({
				ticketNumbers: ticket,
			})
		);
	}, [ticket, dispatch]);

	return (
		<Fragment>
			<div className='numberToSelect'>
				{createNumbersElement().map((el) => el)}
			</div>
		</Fragment>
	);
}
