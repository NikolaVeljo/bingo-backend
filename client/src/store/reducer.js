import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import ticketReducer from "./tikcets/reducer";
import gameReducer from "./game/reducer";

const reducer = combineReducers({
    auth: authReducer,
    ticket: ticketReducer,
    game: gameReducer,
});

export default reducer;