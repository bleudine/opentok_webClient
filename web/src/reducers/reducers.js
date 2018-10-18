import {combineReducers}              from 'redux';
import {RECEIVED_SESSION_CREDENTIALS} from '../actions/actions';

export const session = (state = {token: null, sessionId: null}, action) => {
    switch(action.type) {
        case RECEIVED_SESSION_CREDENTIALS:
            return {
                ...state,
                token: action.token,
                sessionId: action.sessionId
            };
        default:
            return state;
    }
};

export const app = (state = {}, action) => {

    switch(action.type) {
        default:
            return state;
    }
};

export default combineReducers({
    app,
    session,
});


