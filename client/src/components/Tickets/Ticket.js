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
            <div className='all-tickets-container'>
                {tickets && tickets.map(element => {
                    return  <div className='ticket-container'>
                        <div className='selected-numbers'> {element.selectedNumbers.map( e => <div> {e} </div>) }</div>
                         <div>$ {element.stake}</div>
                         <div> Game ID: {element.game}</div>
                     </div>
                }) }
            </div>
        </Fragment>
    )
}