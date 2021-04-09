import React, {useEffect} from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthState} from "../../store/auth/action";
import logo from '../Proba/numbers/22.png';

export default function Navigation() {

    let pathname = useLocation().pathname;
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.authenticated);
    const isChecked = useSelector((state) => state.auth.checked);


    useEffect(() => {
        if(!isChecked) {
            dispatch(checkAuthState);
        }
    }, [pathname, isChecked]);

    return (
        <div className="navigation">

            <div className="logo">
                <img src={logo} alt="Logo" width='40px' height='40px'/>
            </div>

            <div className="header-items">

                <div className="header-item header-logo"/>
                <div className="header-item header-menu"/>


                {isAuthenticated ? (
                    <div className='navigation-links'>
                        <Link to="/" className={(pathname === "/") ? "active-link" : ""}>Bingo</Link>
                        <Link to="/tickets" className={(pathname === "/tickets") ? "active-link" : ""}>Tickets</Link>
                        <Link to="/statistic" className={(pathname === "/statistic") ? "active-link" : ""}>Statistic</Link>
                        <Link to="/sign-out" className={(pathname === "/sign-out") ? "active-link" : ""}>Sign Out</Link>
                    </div>
                ):(
                    <div className='navigation-links'>
                        <Link to="/sign-in" className={(pathname === "/sign-in") ? "active-link" : ""}>Sign In</Link>
                        <Link to="/sign-up" className={(pathname === "/sign-up") ? "active-link" : ""}>Sign Up</Link>
                    </div>
                    )}

            </div>
        </div>
    );
}