import { Box, Container, Paper, Tabs, Tab } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './Profile.scss'
import TabContent from "../../components/tabs/tabContent/TabContent";

function Profile() {
    const context = useContext(AuthContext)

    // tabs navigation
    const [tabId, setTabId] = useState(0);
    const [tabs, setTabs] = useState([
        { label: 'Moje Dane' },
        { label: 'Historia zamówień' },
    ]);

    const tabsHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    }

    return (
        <Container maxWidth="xl" className='profile'>
            <Paper elevation={4} className='profile__card'>
                <Box className='profile__card__header'>
                    Moje konto
                </Box>
                <Box display="flex" justifyContent="center" width="100%">
                    <Tabs
                        className='profile__tabs'
                        value={tabId}
                        // TabIndicatorProps={{ sx: { background: '#DCC080' } }}
                        onChange={tabsHandleChange}
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable tabs">
                        {tabs.map((value, key) =>
                            <Tab label={value.label} key={key} />
                        )}
                    </Tabs>
                </Box>
                <Box className='profile__card__content'>
                    <TabContent value={tabId} index={0}>
                        EMPTY
                    </TabContent>
                    <TabContent value={tabId} index={1}>
                        EMPTY
                    </TabContent>
                </Box>
            </Paper>
        </Container >
    )
}

export default Profile