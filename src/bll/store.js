import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ThunkMiddleware from 'redux-thunk'
import listsReducer from "./lists/ListsReducer";
import authReducer from "./auth/AuthReducer"

let reducers = combineReducers({
    lists: listsReducer,
    auth: authReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));
export default store;
