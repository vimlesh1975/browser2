const initialState = {
    languageList:[]
}
const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGELIST': return {
            ...state,
            languageList: action.payload
        }
        default: return state
    }
}

export default languageReducer
