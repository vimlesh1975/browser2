import { useEffect, useState } from 'react'
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { getToken } from '../components/constants';
import { useSelector, useDispatch } from 'react-redux'



const CueSheet = () => {
    const token = getToken();
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    const dispatch = useDispatch()
    const [cueSheets, setCueSheets] = useState([])

    const cueSheetDate = useSelector(state => state.cueSheetReducer.cueSheetDate)
    const cueSheet = useSelector(state => state.cueSheetReducer.cueSheet)

    useEffect(() => {
        getCueSheets();
        // eslint-disable-next-line
    }, [])

    const getCueSheets = () => {
        Axios.get(`${backEnd}/getCueSheets`, {
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => {
            setCueSheets(res.data);
            if (cueSheet===''){ dispatch({ type: 'CHANGE_CUESHEET', payload: res.data[0]?.CueID })}
        });
    }


    return (
        <div>
            <label for="CueSheet">Date:</label>
            <input type="date" id="CueSheet" name="CueSheet" defaultValue={cueSheetDate} onChange={e => dispatch({ type: 'CHANGE_CUESHEETDATE', payload: e.target.value })} />
            Time:
            <select onChange={e => {
                dispatch({ type: 'CHANGE_CUESHEET', payload: e.target.value })
            }
            } value={cueSheet}>
                {cueSheets.map((val) => {
                    return (<option key={uuidv4()} value={val.CueID}>{val.CueID}</option>)
                })}
            </select>
          {/* <div> Selected:  {cueSheetDate} And {cueSheet}</div> */}
      
        </div>
    )
}

export default CueSheet
