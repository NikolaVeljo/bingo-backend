import * as actionType from "./type";

export const updateGame = (formProps) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.GAME_UPDATE_BEGINS,
        });
        console.log( formProps )
        dispatch({
            type: actionType.GAME_UPDATE_SUCCESS,
            payload: {
                gameNumbers : formProps.gameNumbers ? formProps.gameNumbers : null,
                luckyNumbersPosition: formProps.luckyNumbersPosition ? formProps.luckyNumbersPosition : null,
                currentRoundId: formProps.currentRoundId ? formProps.currentRoundId : null,
                nextRoundId: formProps.nextRoundId ? formProps.nextRoundId : null,
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
            type: actionType.GAME_UPDATE_FAILURE,
            payload: error,
        });
    }
};