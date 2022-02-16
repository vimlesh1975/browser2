
const initialState = {
    newVideo: '',
    newVideoName: '',
    activeId: 20,
    activeMediaId: ''

}

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_VIDEO': return {
            ...state,
            newVideo: action.payload,
            newVideoName: action.filename,
            activeId: action.index,
            activeMediaId: action.activeMediaId
        }
        case 'CHANGE_INDEX': return {
            ...state,
            activeId: action.index
        }

        default: return state
    }
}



export default videoReducer
