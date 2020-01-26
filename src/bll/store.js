import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ThunkMiddleware from 'redux-thunk'
import listsReducer from "./ListsReducer";


// пока у меня будет один редьюсер,
// но оставляю возможность для расширения
let reducers = combineReducers({
    lists: listsReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(reducers, composeEnhancers(applyMiddleware(ThunkMiddleware)));
export default store;
