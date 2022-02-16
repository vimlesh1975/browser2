
const initialState = { media: [], searchedMedia: [] }
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MEDIA_SUCCESS':
            return {
                media: action.payload, searchedMedia: action.payload
            }
        case 'SET_SEARCHED_MEDIA':
            return {
                ...state,
                searchedMedia: action.payload
            }
        case 'FETCH_METADATA_UPDATE':
            const updatedMedia = state.media.map((val) => {
                return val.MediaID === action.payload.MediaID ? { ...val, ORIGTAPENUM: action.payload.ORIGTAPENUM, Cast_Artists: action.payload.Cast_Artists, Language: action.payload.Language, Producer: action.payload.Producer, AgencyName: action.payload.AgencyName, OfficerName: action.payload.OfficerName, Remarks: action.payload.Remarks, Synopsis: action.payload.Synopsis, Gradation: action.payload.Gradation, ProgSet: action.payload.ProgSet, Music: action.payload.Music, Translation: action.payload.Translation } : val;
            });
            return {
                ...state,
                media: [...updatedMedia]
            }
        case 'FETCH_MEDIADATA_UPDATE':
            const updatedMedia2 = state.media.map((val) => {
                return val.MediaID === action.payload.MediaID ? { ...val, LastUpdateTime: action.payload.LastUpdateTime, mediaRemarks: action.payload.mediaRemarks, Favourite: action.payload.Favourite, Deleted: action.payload.Deleted } : val;
            });
            return {
                ...state,
                media: [...updatedMedia2]
            }
        case 'UPDATE_ACCESS_RIGHTS':
            const updatedMedia3 = state.media.map((val) => {
                return val.MediaID === action.payload.MediaID ? { ...val, AccessRights: action.payload.AccessRights } : val;
            });
            return {
                ...state,
                media: [...updatedMedia3]
            }
        case 'UPDATE_MEDIA_NATURE':
            const updatedMedia4 = state.media.map((val) => {
                return val.MediaID === action.payload.MediaID ? { ...val, MediaNature: action.payload.MediaNature } : val;
            });
            return {
                ...state,
                media: [...updatedMedia4]
            }
        case 'UPDATE_TC_OK':
            const updatedMedia5 = state.media.map((val) => {
                return val.MediaID === action.payload.MediaID ? { ...val, TechnicalCheckStatus: action.payload.TechnicalCheckStatus, TechnicalCheckBy: action.payload.TechnicalCheckBy, TechnicalCheckTime: new Date() } : val;
            });
            return {
                ...state,
                media: [...updatedMedia5]
            }
        case 'UPDATE_CONTENT_OK':
            const updatedMedia6 = state.media.map((val) => {
                return val.MediaID === action.payload.MediaID ? { ...val, ContentVerifyStatus: action.payload.ContentVerifyStatus, ContentVerifiedBy: action.payload.ContentVerifiedBy, ContentVerifiedTime: new Date() } : val;
            });
            return {
                ...state,
                media: [...updatedMedia6]
            }
            case 'UPDATE_FAVOURITE':
                const updatedMedia7 = state.media.map((val) => {
                    return val.MediaID === action.payload.MediaID ? { ...val, Favourite: action.payload.Favourite} : val;
                });
                return {
                    ...state,
                    media: [...updatedMedia7]
                }
            
        default: return state
    }
}


export default searchReducer
