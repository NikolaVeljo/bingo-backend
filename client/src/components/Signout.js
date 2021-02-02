import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from "react-router";
import { signout } from "../store/auth/action";

const Signout = () => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.authenticated)

    console.log(isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(signout());
        }
    }, [isAuthenticated]);

    return (
        <div>
            {!isAuthenticated && (<Redirect to={{ pathname: "/" }} />)}
        </div>
    );
};

export default Signout;