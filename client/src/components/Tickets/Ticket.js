import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../../src/store/tikcets/action";

export default function Ticket () {

	const tickets = useSelector((state) => state.ticket.createdTickets);
    const dispatch = useDispatch();

    const displayTickets = (tickets) => {

    }


    useEffect(() => {
        dispatch(getTickets())
    },[]);

    return (
        <Fragment>
            <div> HELLO TICKETS </div>
            <div >
                {tickets && tickets.map(element => {
                     console.log(element.stake, element.game );
                    return  <div>
                        <div> {element.selectedNumbers.map( e => <p> {e} </p>) }</div>
                         <div>$ {element.stake}</div>
                         <div>Game ID: {element.game}</div>
                     </div>
                }) }
            </div>
        </Fragment>
    )
}