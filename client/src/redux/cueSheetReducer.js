const initialState = {
    cueSheetDate: new Date().toISOString().substring(0, 10),
    cueSheet: ''
}
const cueSheetReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_CUESHEETDATE': return {
            ...state,
            cueSheetDate: action.payload
        }
        case 'CHANGE_CUESHEET': return {
            ...state,
            cueSheet: action.payload
        }
        default: return state
    }
}

export default cueSheetReducer
