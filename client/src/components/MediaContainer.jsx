import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';

import ReactPaginate from 'react-paginate';
import './MediaContainer.css'
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { Modal } from 'react-bootstrap';
import Popover from "react-bootstrap/Popover";
import DownloadIcon from '@mui/icons-material/Download';

import axios from 'axios';
import fileDownload from 'js-file-download';

import { getToken } from './constants';
import CueSheet from './CueSheet';
import { resumeAudioContext } from './VideoContainer'
import ContextMenu from './ContextMenu';

const fromReading = val => {
    return (val.substring(0, 2) + ':' + val.substring(2, 4) + ':00');
}
const toReading = (val, duration) => {
    return (parseInt(val.substring(0, 2)) + parseInt(duration.substring(0, 2)) + ':' + (parseInt(val.substring(2, 4)) + parseInt(duration.substring(3, 5))) + ':' + (parseInt(duration.substring(6, 8))));
}
export const MediaContainer = () => {
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 12;
    const pagesVisited = pageNumber * usersPerPage;

    const dispatch = useDispatch();
    const activeId = useSelector(state => state.video.activeId);
    const activeMediaId = useSelector(state => state.video.activeMediaId);
    const media = useSelector(state => state.search.media);


    const cueSheetDate = useSelector(state => state.cueSheetReducer.cueSheetDate)
    const cueSheet = useSelector(state => state.cueSheetReducer.cueSheet)

    const [fixedSlot, setFixedSlot] = useState('')
    const [accessRights, setAccessRights] = useState('All')

    const user = useSelector(state => state.userReducer.user)

    const userList = useSelector(state => state.userListReducer.userList);
    const videoEditor=userList.filter((val)=>{
       return val.Roles==='VE'
    })

    // const fullView = user.userInfo.ViewCode.substring(17, 18)
    const fullView = user.userInfo.ViewCode.toString().trim().substring(user.userInfo.ViewCode.toString().trim().length - 2, user.userInfo.ViewCode.toString().trim().length - 1)

    const searchedMedia = useSelector(state => state.search.searchedMedia);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
        dispatch({ type: 'CHANGE_INDEX', index: 20 })
    };

    function download(url, filename) {
        if (fullView === '1') {
            axios.get(url, {
                responseType: 'blob',
            }).then(res => {
                fileDownload(res.data, filename);
            });
        }
        else {
            alert('Not Authorised')
        }

    }
    // const daydiffrence = (value) => {
    //     var d = (new Date(value));
    //     var daydifference1 = ((new Date()).getTime() - (new Date(value)).getTime()) / (24 * 3600 * 1000);
    //     // var daydifference1 = ((new Date()).getDate() - (new Date(value)).getDate()) ;
    //     if (daydifference1.toFixed(0) === '0') return "Today " + d.getHours() + ":" + d.getMinutes();
    //     if (daydifference1.toFixed(0) === '1') return "Y 'Day " + d.getHours() + ":" + d.getMinutes();
    //     return daydifference1.toFixed(0) + ' Days Ago';
    // }

    const pageCount = Math.ceil(searchedMedia?.length / usersPerPage);



    const popoverMeta = props => (
        <Popover >
            <Popover.Title as="h3" style={{ color: 'red' }}>Click To Add to Cue Sheet</Popover.Title>
        </Popover >
    );

    const popSimple = props => (
        <Popover >
            <Popover.Title as="h3" style={{ color: 'red' }}>{props.title}</Popover.Title>
        </Popover >
    )

    const popoverGeneral = ({ title, content }) => (
        <Popover >
            <Popover.Title as="h3" style={{ color: 'red' }}>{title}</Popover.Title>
            <Popover.Content>
                {content}
            </Popover.Content>
        </Popover >
    );

    function mediacountbyTotal(ProgID, MediaID) {
        let total = 0;
        for (let i = 0; i < searchedMedia.length; i++) {
            if (ProgID === searchedMedia[i].ProgID)
                total++;
        }
        let count = parseInt((MediaID.split(ProgID + '_'))[1]);

        return (count > 50) ? '1/1' : count + `/` + total;
    }

    const [show, setShow] = useState(false);
    const [showShare, setShowShare] = useState(false);
    // const [eventID, setEventID] = useState()

    const handleClose = () => setShow(false);
    // const handleShow = (data) => {
    //     setShow(true);
    // };

    const handleCloseShare = () => setShowShare(false);

    // const shareDisplay = (val) => {
    //     // if (!(val.ProducerUserID)) { 
    //     //     return 'none';
    //     //  }
    //      if (val.ProducerUserID+'' === user.userInfo.UserName) { return 'inline' }
    //     else  { return 'none' }
    // }

    const shareClipToUser = () => {
        setShowShare(false);

        const payload1 = { MediaID: activeMediaId, AccessRights: accessRights };
        dispatch({ type: 'UPDATE_ACCESS_RIGHTS', payload: payload1 })
        const token = getToken();
        const backEnd = process.env.REACT_APP_BACKENDHOST;
        axios
            .put(`${backEnd}/updateAccessRights`, payload1, {
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

    const activeMediaIdDetail = media?.filter((value, index) => {
        return (value.MediaID === activeMediaId)
    });


    const handleSave = () => {
        const payload1 = { pgmID: Math.random() + '_' + activeMediaIdDetail[0].Title, cueID: cueSheet, UserID: user, Programname: activeMediaIdDetail[0].Title, filename: activeMediaIdDetail[0].FilenameProxy1, myDate: (new Date().toISOString().substring(0, 10)), INpoint: '00:00:00', OUTpoint: activeMediaIdDetail[0].Duration, Duration: activeMediaIdDetail[0].Duration, Remarks: activeMediaIdDetail[0].Remarks, fromreading: fromReading(cueSheet.toString()), toreading: toReading(cueSheet.toString(), activeMediaIdDetail[0].Duration), hiresfilename: activeMediaIdDetail[0].MediaID + '.mp4', islive: 'NO', HiResFileTransfer: 0, myCuedate: cueSheetDate, slot: '' }
        setShow(false);
        const token = getToken();
        console.log(token);
        axios
            .put(`${backEnd}/insertInCueSheet`, payload1, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }
    const handleSaveFixedSlot = () => {
        if (fixedSlot === '') {
            alert('select time for fixed slot');
            return
        }
        const payload1 = { pgmID: Math.random() + '_' + activeMediaIdDetail[0].Title, cueID: cueSheet, UserID: user, Programname: activeMediaIdDetail[0].Title, filename: activeMediaIdDetail[0].FilenameProxy1, myDate: (new Date().toISOString().substring(0, 10)), INpoint: '00:00:00', OUTpoint: activeMediaIdDetail[0].Duration, Duration: activeMediaIdDetail[0].Duration, Remarks: activeMediaIdDetail[0].Remarks, fromreading: fromReading(fixedSlot.toString().replace(':', '')), toreading: toReading(fixedSlot.toString().replace(':', ''), activeMediaIdDetail[0].Duration), hiresfilename: activeMediaIdDetail[0].MediaID + '.mp4', islive: 'NO', HiResFileTransfer: 0, myCuedate: cueSheetDate, slot: 'fixed' }
        setShow(false);
        const token = getToken();
        console.log(token);
        axios
            .put(`${backEnd}/insertInCueSheet`, payload1, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            })
    }
    const showtoqsheet = () => {
        if (fullView === '1') {
            setFixedSlot('')
            setShow(true)
        }
        else {
            alert('Not Authorised')
        }
    }

    // const showdownloadIcon = () => {
    //     // (fullView === '1') ? '' : 'none', 
    //     if ((window.location.href.includes('localhost')) || (window.location.href.includes('192.'))) {
    //         if (fullView === '1') {
    //             return 'inline'
    //         }
    //     }
    //     else { return 'none' }
    // }

    return (
        <div className='text-center'>
            <div>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                    forcePage={pageNumber}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                />
                <h5>Toatal:  {searchedMedia.length}</h5>
            </div>

            <div style={{ overflow: 'scroll', maxHeight: '90vh' }}>

                {searchedMedia?.slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((val, index) => {
                        return (
                            <div key={index} onClick={() => {
                                resumeAudioContext();
                                dispatch({ type: 'CHANGE_VIDEO', activeMediaId: (val.MediaID), index: index, payload: `${backEnd}/pbns/dmam/LMedia/proxy1/` + val.FilenameProxy1, filename: val.FilenameProxy1 })
                            }}
                            onContextMenu={() => {
                                resumeAudioContext();
                                dispatch({ type: 'CHANGE_VIDEO', activeMediaId: (val.MediaID), index: index, payload: `${backEnd}/pbns/dmam/LMedia/proxy1/` + val.FilenameProxy1, filename: val.FilenameProxy1 })
                            }}
                             className={activeId === index ? 'user is-active' : 'user'
                            }>
                                <OverlayTrigger placement="top" overlay={popSimple({ title: 'Programm Title' })}><span style={{ whiteSpace: 'nowrap', position: 'relative', top: '3px' }} className='font-weight-bold text-uppercase'>{(val.Title).substring(0, 14)}</span></OverlayTrigger><OverlayTrigger placement="right" overlay={popSimple({ title: 'Media count of The Event' })}><span className='badge badge-dark float-right mr-1 mt-1'>{mediacountbyTotal(val.ProgID, val.MediaID)}</span></OverlayTrigger><br />
                                <video loop onMouseOver={event => event.target.play()} onMouseOut={event => { event.target.pause(); }} style={{ objectFit: 'fill' }} key={val.ThumbnailBig} className='mt-1' src={`${backEnd}/pbns/dmam/LMedia/proxy1/` + val.FilenameProxy1} poster={`${backEnd}/pbns/dmam/LMedia/th1/` + val.ThumbnailBig} alt='' width='226' height='140' ></video>
                                <div style={{ position: 'relative', top: '4px' }}><OverlayTrigger placement="left" overlay={popoverMeta({ val })}><button style={{ display: (fullView === '1') ? '' : 'none' }} onClick={showtoqsheet} className='badge badge-dark mr-1'>CueSheet</button></OverlayTrigger> <OverlayTrigger placement="top" overlay={popoverGeneral({ title: 'TC and Content Verified', content: (val.TechnicalCheckStatus === 1) ? ((val.ContentVerifyStatus !== 1) ? 'TC OK - Yes,Content Verified - No' : 'TC OK - Yes, Content Verified - Yes') : ((val.ContentVerifyStatus !== 1) ? 'TC OK - No,Content Verified-No' : 'TC OK - No, Content Verified-Yes') })}><span className='badge badge-light mr-3'><span style={(val.TechnicalCheckStatus === 1) ? { color: 'green' } : { color: 'red' }}>T/</span><span style={(val.ContentVerifyStatus === 1) ? { color: 'green' } : { color: 'red' }}>C</span></span></OverlayTrigger><OverlayTrigger placement="right" overlay={popSimple({ title: 'Click to Download' })}><button style={{ display: ((fullView === '1') && ((window.location.href.includes('localhost')) || (window.location.href.includes('192.')))) ? 'inline' : 'none' }} className='badge badge-light' onClick={() => download(`${backEnd}/pbns/dmam/Media/HouseFormat/${val.HouseFormat}`, `${val.HouseFormat}`)}><DownloadIcon style={{ fontSize: '18px', width: 25, height: 12 }} /></button></OverlayTrigger>
                                    <button onClick={() => { setShowShare(true); setAccessRights(activeMediaIdDetail[0]?.AccessRights) }} style={{ display: (val.ProducerUserID + '' === user.userInfo.UserName) ? 'inline' : 'none' }} className='badge badge-dark mr-1 ml-2'>Share</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <ContextMenu />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Cue Sheet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CueSheet />
                    {/* <span style={{ backgroundColor: 'blue', color: 'white', marginBottom: '4px', marginTop: '100px', fontSize: 20, fontWeight: 'bold' }}>Enter Time Manually  for fixed Slots  OR</span>
                    <br /> <span style={{ backgroundColor: 'green', color: 'white', marginBottom: '4px', fontSize: 20, fontWeight: 'bold' }}>Let cuesheet decide for Auto timing OR</span>
                    <br />   <span style={{ backgroundColor: 'grey', color: 'white', marginBottom: '4px', fontSize: 20, fontWeight: 'bold' }}> Cancel to Quit!</span> */}
                    <div> <label style={{ color: 'red' }}>Fix Slots Time</label> <input onChange={e => setFixedSlot(e.target.value)} type='time' placeholder="Time to start" step="3600" /></div> {fixedSlot}
                    <div> <button className='btn btn-info' onClick={handleSaveFixedSlot}>Fix a slot</button>   <button className='btn btn-success' onClick={handleSave}>Let cue sheet decide</button> <button className='btn btn-secondary' onClick={handleClose}> Cancel </button></div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>

            <Modal show={showShare} onHide={handleCloseShare}>
                <Modal.Header closeButton>
                    <Modal.Title>Select User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table>
                        <tbody>
                            <tr><td>Users</td><td><select className='SearchContainer-combo' onChange={e => {
                                setAccessRights(e.target.value);
                            }} value={accessRights}>
                                <option key={uuidv4()} value='All'>All</option>
                                {
                                    videoEditor.map((value) => {
                                        return (<option key={uuidv4()} value={value.UserName}>{value.FullName}({value.UserName})</option>)
                                    })}
                            </select></td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={shareClipToUser}>OK</button> <button onClick={() => setShowShare(false)}>Cancel</button>

                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default MediaContainer

