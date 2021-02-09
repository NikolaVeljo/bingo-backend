import React, { Fragment } from 'react';
import NumberToSelect from "./NumberToSelect/NumberToSelect";
import Ticket from './Ticket/Ticket';
import Proba from "../Proba/Proba";
import {useSelector} from 'react-redux';

export default function Bingo () {
	const isAuthenticated = useSelector((state) => state.auth.authenticated);

    console.log(isAuthenticated);

    return (
        <Fragment>
            
            <div className='grid-bingo-container'>
            {isAuthenticated ? '' : (<div className="not-authenticated"> <h1> Sign in to continue! </h1></div>)}
                <div className="bingo-select-numbers">
                    <NumberToSelect />
                </div>
                <div className="ticket">
                    <Ticket />
                </div>
                <div className="bingo-lucky-numbers">
                    <Proba />
                </div>
               
            </div>
            
        </Fragment>
    )
}