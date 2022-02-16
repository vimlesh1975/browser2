import React from 'react'
import Gallery from './Gallery'
import Footer from './components/Footer'
import { Header } from './components/Header'
import Login from './components/Login';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import useToken from './useToken';
import {  useDispatch } from 'react-redux'
import UpdatableMetadata from './components/UpdatableMetadata';

var jwt = require('jsonwebtoken');
const secret = 'VimleshKumar@123';

const App = () => {
    const dispatch = useDispatch()
    const { token, setToken } = useToken();
    const verifytoken = (token) => {
        try {
            // dispatch({ type: 'CHANGE_USER', payload:  jwt.verify(token, secret).FullName })
            dispatch({ type: 'CHANGE_USER', payload:  jwt.verify(token, secret) })

            return jwt.verify(token, secret).FullName
        } catch {
            setToken('');
            window.location.href = '/';
            return 'invalid User'
        }
    }
    return (<>
        {!token ? <Login setToken={setToken} /> :
            (<>
                <div>
                {/* {dummy props is given don't remove.} */}
                    <Header dummy={verifytoken(token)} /> 
                    <Tabs forceRenderTabPanel={true}>
                        <TabList>
                            <Tab> Gallery</Tab>
                            <Tab>Metadata</Tab>
                        </TabList>
                        <TabPanel>
                            <Gallery />
                        </TabPanel>

                        <TabPanel>
                            <UpdatableMetadata />
                        </TabPanel>
                       
                    </Tabs>
                    <Footer />
                </div>
            </>)
        }
    </>)
}

export default App
