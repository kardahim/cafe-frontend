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
import axios from '../../api/axios.js';
import ProductsTab from "./ProductsTab";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Dashboard() {
    const axiosPrivate = useAxiosPrivate();

    // tabs navigation
    const [tabId, setTabId] = useState(0);
    const [tabs, setTabs] = useState([
        { label: 'Produkty' },
        { label: 'Kategorie' },
        { label: 'Promocje' },
        { label: 'Pracownicy' }
    ]);

    // data
    const [categories, setCategories] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [statuses, setStatuses] = useState<any[]>([])

    const tabsHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabId(newValue);
    }

    useEffect(() => {
        axios.get('/categories').then((respone) => {
            setCategories(respone.data)
        })
        axios.get('/products').then((respone) => {
            setProducts(respone.data)
        })
        axios.get('/productstatuses').then((response) => {
            setStatuses(response.data)
        })
    }, [])

    const updateProduct = (product: any) => {
        const data = {
            name: product.name,
            price: product.price,
            size: product.size,
            allergen: product.allergen,
            CategoryId: product.CategoryId,
            ProductStatusId: product.ProductStatusId
        }
        console.log(data)
        const putProduct = async () => {
            try {
                await axiosPrivate.put(`/products/update/${product.id}`, data).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.log(err)
            }
        }
        putProduct();
        return product
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
                        <ProductsTab
                            products={products}
                            statuses={statuses}
                            categories={categories}
                            update={updateProduct} />
                    </TabContent>
                    <TabContent value={tabId} index={1}>
                        Item Two
                    </TabContent>
                    <TabContent value={tabId} index={2}>
                        Item Three
                    </TabContent>
                    <TabContent value={tabId} index={3}>
                        Item Four
                    </TabContent>
                </Box>
            </Paper>
        </Container >
    )
}

export default Dashboard