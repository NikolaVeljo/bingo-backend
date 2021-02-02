import React, { Fragment, useState,useEffect } from 'react';
import Signin from '../components/Signin';
import SignUp from '../components/SignUp';

export default function FormsWrapper (props) {

    const component = props.component;

    return (
        <Fragment>
              {component && component === "SIGN IN" ? <Signin /> : <SignUp/>}
        </Fragment>
    )
}