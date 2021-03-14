import * as actionType from "./type";
import API from "../../API";

export const updateTicket = (formProps) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.TICKET_UPDATE_BEGINS,
        });

        dispatch({
            type: actionType.TICKET_UPDATE_SUCCESS,
            payload: {
                ticketNumbers: formProps.ticketNumbers ? formProps.ticketNumbers : [],
                stake: formProps.stake ? formProps.stake : null,
            },
        });

    } catch (err) {
        let error;
        if (err) {
            error = err;
        } else {
            error = "Something went wrong";
        }
        dispatch({
            type: actionType.TICKET_UPDATE_FAILURE,
            payload: error,
        });
    }
};

export const resetTicket = (dispatch) => {
    dispatch({
        type: actionType.TICKET_RESET,
    });
};

//moras da odvojis create ticket i da razmislis sta sve treba da posaljes na server
// napravi i novi type koji se zove TIcket_create_begins ....
// i pozovi onda ovu akciju createTicket samo kada se klikne dugme submit
export const createTicket = (formProps) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.TICKET_CREATE_BEGINS,
        });
       
        const response = await API.post("/create-ticket", formProps);

        dispatch({
            type: actionType.TICKET_CREATE_SUCCESS,
            payload: {
                message: response.data
            },
        });

    } catch (err) {
        let error;
        if (err) {
            error = err;
        } else {
            error = "Something went wrong";
        }
        dispatch({
            type: actionType.TICKET_CREATE_FAILURE,
            payload: error,
        });
    }
};

export const getTickets = () => async (dispatch) => {
    try {
        dispatch({
            type: actionType.TICKET_GET_BEGINS,
        });
       
        const response = await API.get("/get-tickets");

        dispatch({
            type: actionType.TICKET_GET_SUCCESS,
            payload: {
                allTickets: response.data
            },
        });

    } catch (err) {
        let error;
        if (err) {
            error = err;
        } else {
            error = "Something went wrong";
        }
        dispatch({
            type: actionType.TICKET_GET_FAILURE,
            payload: error,
        });
    }
};