import { v4 as uuidv4 } from 'uuid';
import React, { useRef } from 'react';
import { myTime } from './constants';
import axios from 'axios';
import { getToken } from './constants';
import { useDispatch, useSelector } from 'react-redux'



const MediaData = () => {
    const refMediaNature = useRef();
    const activeMediaId = useSelector(state => state.video.activeMediaId);
    const media = useSelector(state => state.search.media);
    const searchedMedia = useSelector(state => state.search.searchedMedia);
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);


    function mediacountbyTotal(ProgID, MediaID) {
        let total = 0;
        for (let i = 0; i < searchedMedia?.length; i++) {
            if (ProgID === searchedMedia[i]?.ProgID)
                total++;
        }
        let count = parseInt((MediaID.split(ProgID + '_'))[1]);

        return (count > 50) ? '1/1' : count + `/` + total;
    }
    // const daydiffrence = (value) => {
    //     var d = (new Date(value));
    //     var daydifference1 = ((new Date()).getTime() - (new Date(value)).getTime()) / (24 * 3600 * 1000);
    //     // var daydifference1 = ((new Date()).getDate() - (new Date(value)).getDate()) ;
    //     if (daydifference1.toFixed(0) === '0') return "Today " + d.getHours() + ":" + d.getMinutes();
    //     if (daydifference1.toFixed(0) === '1') return "Y 'Day " + d.getHours() + ":" + d.getMinutes();
    //     return daydifference1.toFixed(0) + ' Days Ago';
    // }
    const activeMediaIdDetail = media?.filter((value) => {
        return (value.MediaID === activeMediaId)
    });

    const mediaNature = ['RAW', 'FINISHED'];
    const updateMediaNature = (val) => {
        // setShowShare(false);

        const payload1 = { MediaID: activeMediaId, MediaNature: val };
        dispatch({ type: 'UPDATE_MEDIA_NATURE', payload: payload1 })
        const token = getToken();
        const backEnd = process.env.REACT_APP_BACKENDHOST;
        axios
            .put(`${backEnd}/updateMediaNature`, payload1, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
                alert(response.statusText)
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <div>
            <table border='1' style={{ fontWeight: 'bold' }}>

                {activeMediaIdDetail?.map((val) => {
                    return (<tbody key={uuidv4()}>

                        <tr key={uuidv4()}><td>TitleEpisodePart</td><td style={{ minWidth: 340 }}>{val.TitleEpisodePart}</td></tr>

                        {(val.ProducerUserID + '' !== user.userInfo.UserName) && <tr key={uuidv4()}><td>MediaNature</td><td>{val.MediaNature}</td></tr>}

                        {(val.ProducerUserID + '' === user.userInfo.UserName) && <tr><td>MediaNature</td><td><select ref={refMediaNature} className='SearchContainer-combo' onChange={(e) => {
                        }} defaultValue={val.MediaNature}>
                            {
                                mediaNature.map((value) => {
                                    return (<option key={uuidv4()} value={value}>{value}</option>)
                                })}
                        </select> <button onClick={() => updateMediaNature(refMediaNature.current.value)}>Apply</button></td>
                        </tr>
                        }
                        <tr key={uuidv4()}><td>Size</td><td>{val.FileSize}</td></tr>
                        <tr key={uuidv4()}><td>Duration</td><td>{val.Duration}</td></tr>
                        <tr key={uuidv4()}><td>Location</td><td>{val.Location}</td></tr>
                        <tr key={uuidv4()}><td>Media Count of Event</td><td> {mediacountbyTotal(val.ProgID, val.MediaID)}</td></tr>
                        <tr key={uuidv4()}><td>MediaUploadedTime</td><td>  {(val.MediaUploadedTime)}</td></tr>
                        {/* <tr key={uuidv4()}><td>Synopsis</td><td>  {val.Synopsis}</td></tr> */}
                        <tr key={uuidv4()}><td>Producer</td><td>  {val.Producer}</td></tr>
                        <tr key={uuidv4()}><td>AccessRights</td><td>  {val.AccessRights}</td></tr>
                        <tr key={uuidv4()}><td>User</td><td>  {val.ProducerUserID}</td></tr>
                        {/* <tr key={uuidv4()}><td>OfficerName</td><td>  {val.OfficerName}</td></tr> */}
                        <tr key={uuidv4()}><td>Agency</td><td>  {val.Agency}</td></tr>


                        <tr key={uuidv4()}><td>LastUpdateTime</td><td >{myTime(new Date(val.LastUpdateTime))}</td></tr>
                        <tr key={uuidv4()}><td>Language</td><td >{val.Language}</td></tr>
                        <tr key={uuidv4()}><td>Favourite</td><td >{val.Favourite}</td></tr>
                        {/* <tr key={uuidv4()}><td>Deleted</td><td >{val.Deleted}</td></tr> */}
                        <tr key={uuidv4()}><td>ORIGTAPENUM</td><td >{val.ORIGTAPENUM}</td></tr>
                        <tr key={uuidv4()}><td>Cast_Artists</td><td >{val.Cast_Artists}</td></tr>
                        {/* <tr key={uuidv4()}><td>TechnicalCheckBy</td><td >{val.TechnicalCheckBy}</td></tr> */}
                        {/* <tr key={uuidv4()}><td>ContentVerifiedBy</td><td >{val.ContentVerifiedBy}</td></tr> */}
                        <tr key={uuidv4()}><td>Gradation</td><td >{val.Gradation}</td></tr>
                        <tr key={uuidv4()}><td>ProgSet</td><td >{val.ProgSet}</td></tr>
                        <tr key={uuidv4()}><td>Music</td><td >{val.Music}</td></tr>
                        <tr key={uuidv4()}><td>Translation</td><td >{val.Translation}</td></tr>
                        <tr key={uuidv4()}><td>Primary Cat.</td><td >{val.PriCat}</td></tr>
                        <tr key={uuidv4()}><td>Sec. Cat.</td><td >{val.SecCat}</td></tr>
                        {/* <tr key={uuidv4()}><td>Resolution</td><td >{val.Resolution}</td></tr>
                        <tr key={uuidv4()}><td>VideoCodec</td><td >{val.VideoCodec}</td></tr>
                        <tr key={uuidv4()}><td>VideoBitrate</td><td >{val.VideoBitrate}</td></tr>
                        <tr key={uuidv4()}><td>FPS</td><td >{val.FPS}</td></tr>
                        <tr key={uuidv4()}><td>AudioCodec</td><td >{val.AudioCodec}</td></tr>
                        <tr key={uuidv4()}><td>AudioBitrate</td><td >{val.AudioBitrate}</td></tr>
                        <tr key={uuidv4()}><td>AudioChannels</td><td >{val.AudioChannels}</td></tr>
                        <tr key={uuidv4()}><td>SamplingRate</td><td >{val.SamplingRate}</td></tr> */}


                    </tbody>)
                })}

            </table>

        </div>
    )
}
export default MediaData


