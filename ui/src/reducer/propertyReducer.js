import { GET_PROPERTY } from "../action/property_action";
const initialState = { error: "", data: [] }
const propertyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROPERTY: {
            return { ...state, data: action.payload }
        }
        default: {
            return { ...state }
        }

    }
}
export default propertyReducer