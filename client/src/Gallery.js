import React from 'react'
import './App.css'
import './components/bootstrap.min.css'
import SearchContainer from './components/SearchContainer'
import MediaContainer from './components/MediaContainer'
import VideoContainer from './components/VideoContainer'
import MediaData from './components/MediaData'
import { useSelector } from 'react-redux'


function Gallery() {
  const bg = useSelector(state => state.bgReducer.bg);

  return (<>
    <div className='flex-container'>
      <div  style={{ minWidth: '290px', backgroundColor:bg, border:'1px solid black' }}>
        <SearchContainer />
      </div>
      <div style={{ width: '100%', left: '290px', backgroundColor:bg }} >
        <MediaContainer />
      </div>
      <div  style={{ maxWidth: '495px', minWidth: '495px', backgroundColor:bg }} >
        <VideoContainer />
        <div style={{ overflow: 'scroll', maxHeight: '520px', minWidth: '400px' }}>
          <MediaData />
        </div>
      </div>
    </div>
  </>)
}

export default Gallery