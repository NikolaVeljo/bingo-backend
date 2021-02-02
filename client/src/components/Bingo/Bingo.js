import React, { Fragment } from 'react';
import NumberToSelect from "./NumberToSelect/NumberToSelect";
import Ticket from './Ticket/Ticket';
import Proba from "../Proba/Proba";

export default function Bingo () {

    return (
        <Fragment>
            <div className='grid-bingo-container'>

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