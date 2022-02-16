import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getToken } from './constants';
import React, { useRef, useState } from 'react';
import { myTime } from './constants'
import './UpdatableMetadat.css'

const gradation = ['', 'Gold', 'Silver', 'Bronze']
const UpdatableMetadata = () => {
    const user = useSelector(state => state.userReducer.user)
    const languageList = useSelector(state => state.languageReducer.languageList);

    const [viewMetadata, setViewMetadata] = useState(false)
    const bg = useSelector(state => state.bgReducer.bg);

    // {user.userInfo.ViewCode}
    // const fullView = user.userInfo.ViewCode.substring(17, 18)
    const fullView = user.userInfo.ViewCode.toString().trim().substring(user.userInfo.ViewCode.toString().trim().length - 2, user.userInfo.ViewCode.toString().trim().length - 1)

    //for mediadata
    // const refContentVerifyStatus = useRef();
    // const refContentVerifiedBy = useRef();
    // const refContentVerifiedTime = useRef();
    // const refTechnicalCheckStatus = useRef();
    // const refTechnicalCheckBy = useRef();
    // const refTechnicalCheckTime = useRef();
    const refMediaRemarks = useRef();
    // const refFavourite = useRef();
    const refDeleted = useRef();
    //for mediadata

    //for metadata
    const refORIGTAPENUM = useRef();
    const refCast_Artists = useRef();
    const refLanguage = useRef();
    const refProducer = useRef();
    const refAgencyName = useRef();
    const refOfficerName = useRef();
    const refRemarks = useRef();

    const refSynopsis = useRef();
    const refGradation = useRef();
    const refProgSet = useRef();
    const refMusic = useRef();
    const refTranslation = useRef();
    //for metadata

    const activeMediaId = useSelector(state => state.video.activeMediaId);
    const newVideo = useSelector(state => state.video.newVideo);
    const media = useSelector(state => state.search.media);
    const dispatch = useDispatch();

    const activeMediaIdDetail = media?.filter((value) => {
        return (value.MediaID === activeMediaId)
    });

    const updateMediadata = () => {
        // if (refContentVerifiedTime.current.value !== '') {
        const payload1 = { MediaID: activeMediaId, LastUpdateTime: myTime(new Date().toISOString()), mediaRemarks: refMediaRemarks.current.value, Deleted: refDeleted.current.checked ? 1 : 0 };
        dispatch({ type: 'FETCH_MEDIADATA_UPDATE', payload: payload1 })
        const token = getToken();
        const backEnd = process.env.REACT_APP_BACKENDHOST;
        axios
            .put(`${backEnd}/updateMediadata`, payload1, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
                // alert(response.statusText)
            })
            .catch(error => {
                // alert(error)
            })
        // }
        // else {
        //     alert('Select ContentVerified Time')
        // }
    }

    const updateMetadata = () => {

        const payload1 = { MediaID: activeMediaId, ORIGTAPENUM: refORIGTAPENUM.current.value, Cast_Artists: refCast_Artists.current.value, Language: refLanguage.current.value, Producer: refProducer.current.value, AgencyName: refAgencyName.current.value, OfficerName: refOfficerName.current.value, Remarks: refRemarks.current.value, Synopsis: refSynopsis.current.value, Gradation: refGradation.current.value, ProgSet: refProgSet.current.value, Music: refMusic.current.value, Translation: refTranslation.current.value };
        dispatch({ type: 'FETCH_METADATA_UPDATE', payload: payload1 })
        const token = getToken();
        const backEnd = process.env.REACT_APP_BACKENDHOST;
        axios
            .put(`${backEnd}/update`, payload1, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
                alert(response.statusText)
            })
            .catch(error => {
                // alert(error)
            })
    }
    const updateMetadataAll = () => {
        if (fullView === '1') {
            updateMediadata()
            updateMetadata()
        }
        else {
            alert('Not Authorised')
        }
    }

    return (<div style={{ backgroundColor: bg }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* <div style={{ backgroundColor: bg, border: '2px solid rgb(250, 4, 4)' }}> */}
            <div style={{ backgroundColor: bg }}>

                {/* <h5 style={{ textAlign: 'center', backgroundColor: 'white' }}>Update</h5> */}
                <table border='0' style={{ margin: '20px', fontSize: 22, borderSpacing: 10 }}>
                    {activeMediaIdDetail?.map((val) => {
                        return (
                            <tbody key={uuidv4()}>

                                <tr key={uuidv4()}><td>Orig. Tape Number</td><td><input disabled={(fullView === '1') ? false : true} ref={refORIGTAPENUM} type='text' defaultValue={val.ORIGTAPENUM} /></td>
                                    <td></td><td>Cast_Artists</td><td><input disabled={(fullView === '1') ? false : true} ref={refCast_Artists} type='text' defaultValue={val.Cast_Artists} /></td>
                                </tr>
                                <tr key={uuidv4()}><td>Producer</td><td><input disabled={(fullView === '1') ? false : true} ref={refProducer} type='text' defaultValue={val.Producer} /></td><td></td><td>AgencyName</td><td><input disabled={(fullView === '1') ? false : true} ref={refAgencyName} type='text' defaultValue={val.AgencyName} /></td></tr>
                                <tr key={uuidv4()}><td>OfficerName</td><td><input disabled={(fullView === '1') ? false : true} ref={refOfficerName} type='text' defaultValue={val.OfficerName} /></td><td></td><td>Gradation</td>
                                    <td>
                                        <select ref={refGradation} disabled={(fullView === '1') ? false : true} defaultValue={val.Gradation} className='dateTimeLocal'>
                                            {
                                                gradation.map((value) => {
                                                    return (<option key={uuidv4()} value={value}>{value}</option>)
                                                })}
                                        </select>
                                    </td></tr>
                                <tr key={uuidv4()}><td>ProgSet</td><td><input disabled={(fullView === '1') ? false : true} ref={refProgSet} type='text' defaultValue={val.ProgSet} /></td><td></td><td>Music</td><td><input disabled={(fullView === '1') ? false : true} ref={refMusic} type='text' defaultValue={val.Music} /></td></tr>
                                <tr key={uuidv4()}> <td>Language</td><td>
                                    <select disabled={(fullView === '1') ? false : true} ref={refLanguage} defaultValue={val.Language} className='dateTimeLocal'>
                                        {
                                            languageList.map((value) => {
                                                return (<option key={uuidv4()} value={value.LanguageName}>{value.LanguageName}</option>)
                                            })}
                                    </select>
                                </td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Deleted</td><td><input disabled={(fullView === '1') ? false : true} ref={refDeleted} type='checkbox' defaultChecked={val.Deleted} /></td><td></td></tr>
                                <tr key={uuidv4()}><td>Synopsis</td><td><textarea cols="23" rows="3" disabled={(fullView === '1') ? false : true} ref={refSynopsis} defaultValue={val.Synopsis} /></td><td></td><td>Metadata Remarks</td><td><textarea cols="23" rows="3" disabled={(fullView === '1') ? false : true} ref={refRemarks} type='text' defaultValue={val.Remarks} /></td></tr>
                                <tr key={uuidv4()}><td>Translation</td><td><textarea cols="23" rows="3" disabled={(fullView === '1') ? false : true} ref={refTranslation} type='text' defaultValue={val.Translation} /></td>
                                    <td></td>
                                    <td>Media Remarks</td><td><textarea cols="23" rows="3" disabled={(fullView === '1') ? false : true} ref={refMediaRemarks} type='text' defaultValue={val.mediaRemarks} /></td>
                                </tr>
                            </tbody>)
                    })}
                </table>
                {(fullView === '1') ?
                    <>
                        <div style={{ textAlign: 'center', marginTop: 10 }}>  <button onClick={updateMetadataAll} >Update</button></div>
                    </>
                    :
                    ''}
            </div>
            {/* <div style={{ backgroundColor: bg, border: '2px solid rgb(250, 4, 4)', textAlign: 'center' }}> */}
            <div style={{ backgroundColor: bg, textAlign: 'center' }}>
                {/* <h5 style={{ textAlign: 'center', backgroundColor: 'white' }}>Preview</h5> */}
                <div style={{ margin: '20px' }}>
                    <video src={newVideo} width='400' height='300' controls /> <br />
                </div>
                <button onClick={() => setViewMetadata(val => !val)}>{viewMetadata ? 'Hide Technicaldata' : 'View Technicaldata'}</button>
                {/* <div style={{ backgroundColor: bg, border: '0px solid rgb(250, 4, 4)', display: viewMetadata ? '' : 'none' }}> */}
                <div style={{ backgroundColor: bg, display: viewMetadata ? '' : 'none' }}>
                    {/* <h5 style={{ textAlign: 'center', backgroundColor: 'white' }}>View</h5> */}
                    <table border='1' style={{ margin: '20px', fontWeight: 'bold' }}>

                        {activeMediaIdDetail?.map((val) => {
                            return (<tbody key={uuidv4()}>
                                <tr key={uuidv4()}><td>VideoCodec</td><td style={{ minWidth: 300 }}>{val.VideoCodec}</td></tr>
                                <tr key={uuidv4()}><td>VideoBitrate</td><td>{val.VideoBitrate}</td></tr>
                                <tr key={uuidv4()}><td>FPS</td><td>{val.VideoFPS}</td></tr>
                                <tr key={uuidv4()}><td>Resolution</td><td>{val.VideoResolution}</td></tr>
                                <tr key={uuidv4()}><td>Aspect</td><td>{val.VideoAspect}</td></tr>
                                <tr key={uuidv4()}><td>AudioCodec</td><td>{val.AudioCodec}</td></tr>
                                <tr key={uuidv4()}><td>AudioBitrate</td><td>{val.AudioBitrate}</td></tr>
                                <tr key={uuidv4()}><td>AudioChannels</td><td>{val.AudioChannels}</td></tr>
                                <tr key={uuidv4()}><td>SamplingRate</td><td>{val.AudioSamplingRate}</td></tr>
                                <tr key={uuidv4()}><td>Duration</td><td>{val.Duration}</td></tr>
                                <tr key={uuidv4()}><td>FileSize</td><td>{val.FileSize}</td></tr>
                                <tr key={uuidv4()}><td>FileTime</td><td>{myTime(new Date(val.MediaFileTime)).toLocaleString()}</td></tr>
                            </tbody>)
                        })}
                    </table>
                </div>
            </div>
        </div>
    </div>)
}
export default UpdatableMetadata


