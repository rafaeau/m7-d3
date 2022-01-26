import { initialState } from '../store'

const mainReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            }
        default:
            return state
    }
}

export default mainReducer