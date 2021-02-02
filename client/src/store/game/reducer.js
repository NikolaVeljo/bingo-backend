import * as actionType from "./type";

const initialGameState = {
    gameNumbers : [],
    luckyNumbersPosition: [],
    currentRoundId: null,
    nextRoundId: null,
    loading: false,
    error: null,
};

const gameReducer = (state = initialGameState, {type, payload}) => {
    switch (type) {
        case actionType.GAME_UPDATE_BEGINS:
            return {
                ...state,
                loading: true,
                error: null,
            }
            
        case actionType.GAME_UPDATE_SUCCESS:
            console.log( payload )
            return {
                ...state,
                gameNumbers: payload.gameNumbers ? payload.gameNumbers : state.gameNumbers,
                luckyNumbersPosition : payload.luckyNumbersPosition ? payload.luckyNumbersPosition : state.luckyNumbersPosition,
                currentRoundId: payload.currentRoundId ? payload.currentRoundId : state.currentRoundId,
                stake: payload.stake ? payload.stake : state.stake,
                loading: false,
                checked: true,
            }
        case actionType.GAME_UPDATE_FAILURE:
            return {
                loading: false,
                error: payload,
            }
        default:
            return state;
    }
};

export default gameReducer;