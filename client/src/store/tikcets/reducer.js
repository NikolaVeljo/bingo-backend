import * as actionType from "./type";

const initialTicketState = {
	ticketNumbers: [],
	stake: null,
	loading: false,
	error: null,
};

const ticketReducer = (state = initialTicketState, { type, payload }) => {
	switch (type) {
		case actionType.TICKET_UPDATE_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.TICKET_UPDATE_SUCCESS:
			return {
				...state,
				ticketNumbers: payload.ticketNumbers.length !== 0 ? payload.ticketNumbers : state.ticketNumbers,
				stake: payload.stake ? payload.stake : state.stake,
				userId: payload.userId ? payload.userId : state.userId,
				loading: false,
				checked: true,
			};
		case actionType.TICKET_UPDATE_FAILURE:
			return {
                ...state,
				loading: false,
				error: payload,
			};
		case actionType.TICKET_CREATE_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
		case actionType.TICKET_CREATE_SUCCESS:
			return {
				...state,
				ticketNumbers: payload.ticketNumbers
					? payload.ticketNumbers
					: state.ticketNumbers,
				roundId: payload.roundId ? payload.roundId : state.roundId,
				stake: payload.stake ? payload.stake : state.stake,
				loading: false,
				checked: true,
			};
		case actionType.TICKET_CREATE_FAILURE:
			return {
                ...state,
				loading: false,
				error: payload,
			};
        case actionType.TICKET_GET_BEGINS:
			return {
				...state,
				loading: true,
				error: null,
			};
			
		case actionType.TICKET_GET_SUCCESS:
			return {
				...state,
				createdTickets: payload.allTickets,
				loading: false,
				checked: true,
			};
		case actionType.TICKET_GET_FAILURE:
			return {
                ...state,
				loading: false,
				error: payload,
			};
        case actionType.TICKET_RESET:
            return {
                ...state,
                ticketNumbers : [],
                stake: null,
            }
		default:
			return state;
	}
};

export default ticketReducer;
