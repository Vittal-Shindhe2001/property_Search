import {  createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'
import propertyReducer from "../reducer/propertyReducer";
const store = () => {
    const store = createStore(combineReducers({
        property:propertyReducer
    }), applyMiddleware(thunk))
    return store
}

export default store