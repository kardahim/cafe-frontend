import { Box, Container, Paper, Tabs, Tab } from '@mui/material'
import React, { useState } from 'react'
import './Profile.scss'
import TabContent from "../../components/tabs/tabContent/TabContent";
import MyData from '../../components/myData/MyData';
import OrderHistory from '../../components/orderHistory/OrderHistory';

function Profile() {
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
                        <MyData />
                    </TabContent>
                    <TabContent value={tabId} index={1}>
                        <OrderHistory />
                    </TabContent>
                </Box>
            </Paper>
        </Container >
    )
}

export default Profile