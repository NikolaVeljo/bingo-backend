import * as actionType from "./type";

export const updateTicket = (formProps) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.TICKET_UPDATE_BEGINS,
        });
        dispatch({
            type: actionType.TICKET_UPDATE_SUCCESS,
            payload: {
                ticketNumbers: formProps.ticketNumbers ? formProps.ticketNumbers : null,
                roundId: formProps.roundId ? formProps.roundId : null,
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