import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import './SearchContainer.css'
import Axios from 'axios';
import { getToken } from '../components/constants';
import { v4 as uuidv4 } from 'uuid';

export const SearchContainer = () => {
    const reftextSeacrh = React.useRef();
    const token = getToken();
    const backEnd = process.env.REACT_APP_BACKENDHOST;
    const media = useSelector(state => state.search.media);
    const languageList = useSelector(state => state.languageReducer.languageList);
    const userList = useSelector(state => state.userListReducer.userList);

    const dispatch = useDispatch()
    const [primaryCategoryList, setPrimaryCategoryList] = useState([]);
    const [primaryCategory, setPrimaryCategory] = useState('All');
    const [secondaryCategoryList, setSecondaryCategoryList] = useState([]);

    const [secondaryCategory, setSecondaryCategory] = useState('All');

    var [relatedSecondaryCategoryList, setRelatedSecondaryCategoryList] = useState([]);
    window.primaryCategoryList = primaryCategoryList;
    window.secondaryCategoryList = secondaryCategoryList;

    const [title, setTitle] = useState('');
    // const [producer, setProducer] = useState('');
    // const [userList, setUserList]=useState([]);
    const [user, setUser] = useState('All');
    const loggedUser = useSelector(state => state.userReducer.user);

    const [agencyName, setAgencyName] = useState(null);
    const [officerName, setOfficerName] = useState(null);
    const [language, setLanguage] = useState('All');

    const [cast_Artists, setCast_Artists] = useState(null);

    const [technicalCheckStatus, setTechnicalCheckStatus] = useState(false)
    const [verified, setVerified] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const initialFromDate = '2021-10-10';
    const initialToDate =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1 < 10
            ? "0" + (new Date().getMonth() + 1)
            : new Date().getMonth() + 1) +
        "-" +
        (new Date().getDate() < 10
            ? "0" + new Date().getDate()
            : new Date().getDate())

    const [fromDate, setFromDate] = useState(initialFromDate);
    const [toDate, setToDate] = useState(initialToDate);

    const resetSearch = () => {
        // setSearchTextEventLocation('');
        // setProducer('');
        setUser('All');
        setAgencyName(null);
        setOfficerName(null);
        setLanguage('All')
        setCast_Artists(null)
        // setProgrammeSource('');
        setTitle('');
        // setState('All');
        setPrimaryCategory('All');
        setSecondaryCategory('All');
        // setUser('All');
        setFromDate(initialFromDate);
        setToDate(initialToDate);
        setTechnicalCheckStatus(false);
        setVerified(false);
        setFavourite(false);
        setDeleted(false);

        reftextSeacrh.current.value = '';
        universalSearch('')

    }


    // eslint-disable-next-line
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
        return this;
    };


    // const getTime1 = (t1) => {
    //     let aa = new Date(t1);
    //     return aa
    // }

    //&& (value.AgencyName?.toLowerCase().search(agencyName?.toLowerCase()) > -1)
    // && (value.OfficerName?.toLowerCase().search(officerName?.toLowerCase()) > -1)

    var searchedMedia;
    searchedMedia = media?.filter((value) => {
        return (
            (value.Title?.toLowerCase().search(title?.toLowerCase()) > -1)
            // && (value.Producer?.toLowerCase().search(producer?.toLowerCase()) > -1)
            && ((((value.AgencyName === null) && (agencyName === null)) || (agencyName === '')) ? value : (value.AgencyName?.toLowerCase()?.search(agencyName?.toLowerCase()) > -1))
            && ((((value.OfficerName === null) && (officerName === null)) || (officerName === '')) ? value : (value.OfficerName?.toLowerCase()?.search(officerName?.toLowerCase()) > -1))
            && ((language === 'All') ? (value) : (value.Language.trim() === language))
            && ((user === 'All') ? (value) : ((value.ProducerUserID === user) || (value.AccessRights === user)))
            && (((value.Cast_Artists === null) && (cast_Artists === null)) ? value : (value.Cast_Artists?.toLowerCase()?.search(cast_Artists?.toLowerCase()) > -1))
            && ((primaryCategory === 'All') ? (value) : (value.PriCat === primaryCategory))
            && ((secondaryCategory === 'All') ? (value) : (value.SecCat === secondaryCategory))
            && (new Date(fromDate) <= (new Date(value.MediaUploadedTime)))
            && (new Date(toDate) >= (new Date(value.MediaUploadedTime).addDays(-1)))
            && (technicalCheckStatus ? value.TechnicalCheckStatus : value)
            && (verified ? value.ContentVerifyStatus : value)
            && (favourite ? value.Favourite : value)
            && (deleted ? value.Deleted : value)
            && ((value.MediaNature === 'FINISHED') || (value.ProducerUserID + '' === loggedUser.userInfo.UserName))
        )
    })


    const universalSearch = val => {
        // setTextSearch(val);
        searchedMedia = media?.filter((value) => {
            return (
                (value.Location?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.Title?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.Producer?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.AgencyName?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.OfficerName?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.Language?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.Cast_Artists?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.PriCat?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.SecCat?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.TechnicalCheckBy?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.ContentVerifiedBy?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.Synopsis?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.Gradation?.toLowerCase().search(val.toLowerCase()) > -1)
                || (value.ProgSet?.toLowerCase().search(val.toLowerCase()) > -1)
                // || (value.ORIGTAPENUM?.toLowerCase().search(val.toLowerCase()) > -1)
            )
        })
        dispatch({ type: 'SET_SEARCHED_MEDIA', payload: searchedMedia });
    }

    const fetchMedia = () => {

        Axios
            .get(`${backEnd}/getmedia`, {
                headers: {
                    'Authorization': `${token}`
                }
            })
            .then(response => {
                const media = response.data
                dispatch({ type: 'FETCH_MEDIA_SUCCESS', payload: media })
            })
            .catch(error => {
            })
    }


    useEffect(() => {
        fetchMedia();
        // eslint-disable-next-line
    }, [])

    const getUsers = () => {
        Axios.get(`${backEnd}/getusers`, {
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => {
            //  setUserList(res.data);
            dispatch({ type: 'SET_USER_LIST', payload: res.data });

        });
    }
    const getStates = () => {
        Axios.get(`${backEnd}/getstates`, {
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => {
            // setStatelist(res.data);
        });
    }
    const getAllPrimaryCategory = () => {
        Axios.get(`${backEnd}/getAllPrimaryCategory`, {
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => {
            setPrimaryCategoryList(res.data);
        });
    }
    const getAllSecondaryCategory = () => {
        Axios.get(`${backEnd}/getAllSecondaryCategory`, {
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => {
            setSecondaryCategoryList(res.data);
        });
    }
    const getLanguageList = () => {
        Axios.get(`${backEnd}/getLanguageList`, {
            headers: {
                'Authorization': `${token}`
            }
        }).then(res => {
            dispatch({ type: 'CHANGE_LANGUAGELIST', payload: res.data });

        });
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getUsers();
        getStates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getAllPrimaryCategory();
        // eslint-disable-next-line
        getAllSecondaryCategory();
        // eslint-disable-next-line
        getLanguageList();
        // eslint-disable-next-line
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        dispatch({ type: 'SET_SEARCHED_MEDIA', payload: searchedMedia });
        // eslint-disable-next-line
    }, [searchedMedia])

    return (
        <>
            <table className='table table-dark' >
                <tbody>
                    <tr><td>Field</td><td> <button className='btn btn-success' onClick={(e) => { resetSearch() }}>Reset Search  </button></td></tr>
                    <tr><td>Title</td><td><input className='SearchContainer-combo' value={title} onChange={(e) => { setTitle(e.target.value); }} type='text' placeholder='Title' /></td></tr>
                    {/* <tr><td>Producer</td><td><input className='SearchContainer-combo' value={producer} onChange={(e) => { setProducer(e.target.value); }} type='text' placeholder='Producer' /></td></tr> */}

                    <tr><td>Users</td><td><select className='SearchContainer-combo' onChange={(e) => {
                        setUser(e.target.value);
                    }} value={user}>
                        <option key={uuidv4()} value='All'>All</option>
                        {
                            userList.map((value) => {
                                return (<option key={uuidv4()} value={value.UserName}>{value.FullName}({value.UserName})</option>)
                            })}
                    </select></td>
                    </tr>

                    <tr><td>Agency</td><td><input className='SearchContainer-combo' value={agencyName} onChange={(e) => { setAgencyName(e.target.value); }} type='text' placeholder='Agency Name' /></td></tr>
                    <tr><td>Officer</td><td><input className='SearchContainer-combo' value={officerName} onChange={(e) => { setOfficerName(e.target.value); }} type='text' placeholder='Officer Name' /></td></tr>

                    <tr><td>Language</td><td><select className='SearchContainer-combo' onChange={(e) => {
                        setLanguage(e.target.value);
                    }} value={language}>
                        <option key={uuidv4()} value='All'>All</option>
                        {
                            languageList.map((value) => {
                                return (<option key={uuidv4()} value={value.LanguageName}>{value.LanguageName}</option>)
                            })}
                    </select></td>
                    </tr>


                    <tr><td>Cast_Artists</td><td><input className='SearchContainer-combo' value={cast_Artists} onChange={(e) => { setCast_Artists(e.target.value); }} type='text' placeholder='Cast_Artists' /></td></tr>


                    <tr><td>Pri Category</td><td><select className='SearchContainer-combo' onChange={(e) => {
                        setPrimaryCategory(e.target.value);
                        setRelatedSecondaryCategoryList(secondaryCategoryList.filter(val => val.PrimaryCat === e.target.value));
                        setSecondaryCategory('All');

                    }} value={primaryCategory}>
                        <option key={uuidv4()} value='All'>All</option>
                        {
                            primaryCategoryList.map((value) => {
                                return (<option key={uuidv4()} value={value.PriCat}>{value.PriCat}</option>)
                            })}
                    </select></td>
                    </tr>
                    <tr><td>Sec Category</td><td><select value={secondaryCategory} className='SearchContainer-combo' onChange={(e) => { setSecondaryCategory(e.target.value); }}>
                        <option key={uuidv4()} value='All'>All</option>
                        {
                            relatedSecondaryCategoryList.map((value) => {
                                return (<option key={uuidv4()} value={value.SecCat}>{value.SecCat}</option>)
                            })}
                    </select></td></tr>

                    <tr><td>From</td><td><input className='SearchContainer-combo' type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} /></td></tr>
                    <tr><td>To</td><td><input className='SearchContainer-combo' type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} /></td></tr>

                    <tr><td>T C OK</td><td><input className='' checked={technicalCheckStatus} type="checkbox" onChange={() => {
                        setTechnicalCheckStatus(!technicalCheckStatus);
                    }} /></td></tr>
                    <tr><td>Verified</td><td><input className='' checked={verified} type="checkbox" onChange={() => setVerified(!verified)} /></td></tr>
                    <tr><td>Favourite</td><td><input className='' checked={favourite} type="checkbox" onChange={() => setFavourite(!favourite)} /></td></tr>
                    <tr><td>Deleted</td><td><input className='' checked={deleted} type="checkbox" onChange={() => setDeleted(!deleted)} /></td></tr>
                    <tr style={{ backgroundColor: 'grey' }}><td>Text </td><td><input ref={reftextSeacrh} defaultValue='' className='SearchContainer-combo' onChange={(e) => {
                        universalSearch(e.target.value);

                    }} type='text' placeholder='Text Search' /></td></tr>

                </tbody>
            </table>
        </>
    )
}

export default SearchContainer;

