import * as actionType from "./type";

const initialTicketState = {
    ticketNumbers : [],
    roundId: null,
    stake: null,
    loading: false,
    error: null,
};

const ticketReducer = (state = initialTicketState, {type, payload}) => {
    switch (type) {
        case actionType.TICKET_UPDATE_BEGINS:
            return {
                ...state,
                loading: true,
                error: null,
            } 
        case actionType.TICKET_UPDATE_SUCCESS:

            return {
                ...state,
                ticketNumbers: payload.ticketNumbers ? payload.ticketNumbers : state.ticketNumbers,
                roundId: payload.roundId ? payload.roundId : state.roundId,
                stake: payload.stake ? payload.stake: state.stake,
                loading: false,
                checked: true,
            }
        case actionType.TICKET_UPDATE_FAILURE:
            return {
                loading: false,
                error: payload,
            }
        default:
            return state;
    }
};

export default ticketReducer;