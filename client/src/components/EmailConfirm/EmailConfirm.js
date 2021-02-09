import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { emailToken } from '../../store/auth/action';
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router";

export default function EmailConfirm () {
    const dispatch = useDispatch();
    
    let {id} = useParams();
    let isEmailConfirmed = useSelector((state) => state.auth.confirmed);
    
    useEffect(()=>{
        dispatch(emailToken({
            emailToken: id
        }))
    }, []);

    console.log(isEmailConfirmed);

    return (
        <Fragment>
            {isEmailConfirmed && (<Redirect to={{ pathname: "/sign-in" }} />)}
        </Fragment>
    )
}