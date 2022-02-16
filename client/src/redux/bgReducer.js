const initialState = {
    bg:'#7092BE'
}
const bgReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_BG': return {
            ...state,
            bg: action.payload
        }
        default: return state
    }
}
// bg:'#7092BE'
export default bgReducer