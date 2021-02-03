import * as actionType from "./type";
import API from "../../API";

export const checkAuthState = async (dispatch) => {
	try {
		dispatch({
			type: actionType.CHECKING_AUTH_STATE_BEGINS,
		});

		const csrf = localStorage.getItem("csrf");

		if (csrf) {
            const response = await API.get("/get-user");
            
			dispatch({
				type: actionType.CHECKING_AUTH_STATE_SUCCESS,
				payload: {
					authenticated: response.data.authenticated,
					username: response.data.username,
					csrf: response.data.csrf,
					confirmed: response.data.confirmed,
					role: response.data.role,
				},
			});
		} else {
			dispatch({
				type: actionType.CHECKING_AUTH_STATE_SUCCESS,
				payload: {
					authenticated: false,
					username: null,
				},
			});
		}
	} catch (e) {
		let error;
		if (e.response) {
			error = e.response.data.message;
			if (e.response.data.code === 401) {
				localStorage.removeItem("csrf");
			}
		} else {
			error = "Server is down";
		}
		dispatch({
			type: actionType.CHECKING_AUTH_STATE_FAILURE,
			payload: error,
		});
	}
};

export const signup = (formProps) => async (dispatch) => {
	try {
		dispatch({
			type: actionType.SIGNUP_BEGINS,
		});

		console.log(formProps);
		const response = await API.post("/sign-up", formProps);

		dispatch({
			type: actionType.SIGNUP_SUCCESS,
			payload: {
				authenticated: response.data.authenticated,
				username: response.data.username,
				csrf: response.data.csrf,
				confirmed: response.data.confirmed,
				role: response.data.role,
			},
		});
	} catch (err) {
		let error;
		if (err.response) {
			error = err.response.data.message;
		} else {
			error = "Server is down";
		}
		dispatch({
			type: actionType.SIGNUP_FAILURE,
			payload: error,
		});
	}
};


export const signin = (formProps) => async (dispatch) => {
	try {
		dispatch({
			type: actionType.SIGNIN_BEGINS,
		});
		
		const response = await API.post("/sign-in", formProps);
		if ( response.data.csrf ){
			localStorage.setItem("csrf", response.data.csrf);
		}

		dispatch({
			type: actionType.SIGNIN_SUCCESS,
			payload: {
				authenticated: response.data.authenticated,
				username: response.data.username,
				csrf: response.data.csrf,
				confirmed: response.data.confirmed,
				role: response.data.role,
			},
		});
	} catch (err) {
		let error;
		if (err.response) {
			error = err.response.data.message;
		} else {
			error = "Server is down";
		}
		dispatch({
			type: actionType.SIGNIN_FAILURE,
			payload: error,
		});
	}
};

export const signout = () => async (dispatch) => {
	try {
		dispatch({
			type: actionType.SIGNOUT_BEGINS,
		});
		const response = await API.get("/sign-out");
		localStorage.clear();
		dispatch({
			type: actionType.SIGNOUT_SUCCESS,
			payload: {
				checked: true,
				username: null,
				csrf: null,
				role:null,
				authenticated: false,
			},
		});
	} catch (err) {
		let error;
		if (err.response) {
			error = err.response.data.message;
		} else {
			error = "Server is down";
		}
		dispatch({
			type: actionType.SIGNOUT_FAILURE,
			payload: error,
		});
	}
};

export const emailConfirm = (formProps) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.EMAIL_CONFIRM_BEGINS,
        });
		const response = await API.post("/email-confirm", formProps);
		
		dispatch({
            type: actionType.EMAIL_CONFIRM_SUCCESS,
            payload: {
                confirmed: response.data.emailConfirmed,
            },
		});
		
    } catch (err) {
        let error;
        if (err.response) {
            error = err.response.data.message;
        } else {
            error = "Server is down";
        }
        dispatch({
            type: actionType.EMAIL_CONFIRM_FAILURE,
            payload: error,
        });
    }
};