import {
    Container,
    Paper,
    Box,
    Tabs,
    Tab
} from "@mui/material";
import './Dashboard.scss'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import TabContent from "../../components/tabContent/TabContent";

function Dashboard() {
    const [tabId, setTabId] = useState(0);
    const [tabs, setTabs] = useState([
        { label: 'Produkty i Kategorie' },
        { label: 'Promocje' },
        { label: 'Pracownicy' }
    ]);


    const tabsHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    }

    return (
        <Container maxWidth="xl" className='dashboard'>
            <Paper elevation={4} className='dashboard__card'>
                <Box className='dashboard__card__header'>
                    Dashboard
                </Box>
                <Box display="flex" justifyContent="center" width="100%">
                    <Tabs
                        className='dashboard__tabs'
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
                <Box className='dashboard__card__content'>
                    <TabContent value={tabId} index={0}>
                        Item One
                    </TabContent>
                    <TabContent value={tabId} index={1}>
                        Item Two
                    </TabContent>
                    <TabContent value={tabId} index={2}>
                        Item Three
                    </TabContent>
                </Box>
            </Paper>
        </Container >
    )
}

export default Dashboard