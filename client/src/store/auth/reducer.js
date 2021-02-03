import * as actionType from "./type";

const initialAuthState = {
	authenticated: false,
	checked: false,
	username: null,
	email: null,
	password: null,
	passwordConfirm: null,
	csrf: null,
	loading: false,
	error: null,
};

const authReducer = (state = initialAuthState, { type, payload }) => {
	switch (type) {
		case actionType.CHECKING_AUTH_STATE_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.CHECKING_AUTH_STATE_SUCCESS:
			return {
				...state,
				loading: false,
				checked: true,
				authenticated: payload.authenticated,
				username: payload.username,
				confirmed: payload.confirmed,
				role: payload.role,
				csrf: payload.csrf,
				error: null,
			};
		case actionType.CHECKING_AUTH_STATE_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case actionType.SIGNIN_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.SIGNIN_SUCCESS:
			return {
				...state,
				loading: false,
				checked: true,
				authenticated: payload.authenticated,
				username: payload.username,
				confirmed: payload.confirmed,
				role: payload.role,
				csrf: payload.csrf,
				error: null,
			};
		case actionType.SIGNIN_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case actionType.SIGNOUT_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.SIGNOUT_SUCCESS:
			console.log(payload.auth);
			return {
				...state,
				loading: false,
				authenticated: false,
				checked: true,
				confirmed: false,
				username: null,
				csrf: null,
				role: null,
				error: null,
			};
		case actionType.SIGNOUT_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case actionType.SIGNUP_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				checked: true,
				authenticated: payload.authenticated,
				username: payload.username,
				confirmed: payload.confirmed,
				role: payload.role,
				csrf: payload.csrf,
				error: null,
			};
		case actionType.SIGNUP_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};
		case actionType.EMAIL_CONFIRM_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.EMAIL_CONFIRM_SUCCESS:
			return {
				...state,
				loading: false,
				confirmed: payload.confirmed,
				error: null,
			};
		case actionType.EMAIL_CONFIRM_FAILURE:
			return {
				...state,
				loading: false,
				error: payload,
			};

		default:
			return state;
	}
};

export default authReducer;
