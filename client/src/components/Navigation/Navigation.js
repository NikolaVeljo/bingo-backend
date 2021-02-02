import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthState} from "../../store/auth/action";
import logo from '../Proba/numbers/22.png';
import FormsWrapper from '../FormsWrapper';

import Modal from 'react-modal';

export default function Navigation() {


    Modal.setAppElement('#root');

    let pathname = useLocation().pathname;
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.authenticated);
    const isChecked = useSelector((state) => state.auth.checked);
    const [show, setShow] = useState(false);
    const [component, setComponent] = useState(false);

    console.log(isAuthenticated);

    const openModal = (e) => {
        console.log(e.target.innerText);
        setComponent(e.target.innerText)
        setShow(true);
    }

    const closeModal = () => {
        setShow(false);
    }


    useEffect(() => {
        if(!isChecked) {
            dispatch(checkAuthState);
        }
    }, [pathname, isChecked]);

    return (
        <div className="navigation">

            <div className="logo">
                <img src={logo} width='40px' height='40px'/>
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
                        <Link to={pathname} onClick={openModal} className={(pathname === "/sign-in") ? "active-link" : ""}>Sign In</Link>
                        <Link to={pathname} onClick={openModal} className={(pathname === "/sign-up") ? "active-link" : ""}>Sign Up</Link>
                        <Modal
                            overlayClassName='overlay-class'
                            shouldCloseOnOverlayClick={true}
                            className='modal-overlay'
                            isOpen={show}
                            onRequestClose={closeModal}
                            contentLabel="example modal">
                                <FormsWrapper component={component} />
                        </Modal>
                    </div>
                    )}

            </div>
        </div>
    );
}