import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { emailConfirm } from '../../store/auth/action';
import {useDispatch} from "react-redux";

export default function EmailConfirm () {
    const dispatch = useDispatch();
    let {id} = useParams();

    useEffect(()=>{

        dispatch(emailConfirm({
            emailConfirm: id
        }))

    },[]);

    return (
        <Fragment>
            <div  > This is email confirmation page </div>
        </Fragment>
    )
}