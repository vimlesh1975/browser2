import React from 'react'
import { useSelector } from 'react-redux'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
function DetailContainer() {
    const activeMediaId = useSelector(state => state.video.activeMediaId);
    const media = useSelector(state => state.search.media);
    const activeMediaIdDetail = media.filter((value, index) => {
        return (value.MediaID === activeMediaId)
    });
    return (<>
        <Tabs>
            <TabList>
                <Tab>Media Detail</Tab>
            </TabList>
            <TabPanel>
                <div style={{ overflow: 'scroll', maxHeight: '480px', minWidth: '400px' }}>
                    <table className='table table-dark'>
                        <tbody>
                            {activeMediaIdDetail && activeMediaIdDetail[0] &&
                                Object.entries(activeMediaIdDetail[0]).map(([keys, values]) => {
                                    return <tr key={keys}><th>{keys}</th><td>{values}</td></tr>
                                })
                            }

                        </tbody>
                    </table>
                </div>

            </TabPanel>
        </Tabs>
    </>)
}

export default DetailContainer;