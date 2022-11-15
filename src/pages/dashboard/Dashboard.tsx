import {
    Container,
    Paper,
    Box,
    Tabs,
    Tab
} from "@mui/material";
import './Dashboard.scss'
import { useEffect, useState } from 'react';
import TabContent from "../../components/tabContent/TabContent";
import axios from '../../api/axios.js';
import ProductsTab from "./ProductsTab";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CategoriesTab from "./CategoriesTab";
import SpecialOffersTab from "./SpecialOffersTab";

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
    const [specialOffers, setSpecialOffers] = useState<any[]>([])

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
        axios.get('/specialoffers').then((response) => {
            setSpecialOffers(response.data)
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

    const updateCategory = (category: any) => {
        const data = {
            name: category.name,
        }
        const putCategory = async () => {
            try {
                await axiosPrivate.put(`/categories/update/${category.id}`, data).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.log(err)
            }
        }
        putCategory()
        return category
    }
    const updateSpecialOffer = (specialOffer: any) => {
        const data = {
            value: specialOffer.value,
            start_date: specialOffer.start_date,
            end_date: specialOffer.end_date,
            ProductId: specialOffer.productId
        }
        axios.put(`/specialoffers/update/${specialOffer.id}`, data).then((response) => {
            console.log(response.data)
        })
        return specialOffer
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
                        <CategoriesTab
                            categories={categories}
                            update={updateCategory}
                        />
                    </TabContent>
                    <TabContent value={tabId} index={2}>
                        <SpecialOffersTab
                            specialOffers={specialOffers}
                            update={updateSpecialOffer}
                            products={products} />
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