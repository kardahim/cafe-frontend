import {
    Container,
    Paper,
    Box,
    Tabs,
    Tab
} from "@mui/material";
import './Dashboard.scss'
import { useEffect, useState } from 'react';
import TabContent from "../../components/tabs/tabContent/TabContent";
import axios from '../../api/axios.js';
import ProductsTab from "../../components/tabs/productsTab/ProductsTab";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import CategoriesTab from "../../components/tabs/categoriesTab/CategoriesTab";
import SpecialOffersTab from "../../components/tabs/specialOffersTab/SpecialOffersTab";
import UsersTab from "../../components/tabs/usersTab/UsersTab";
import ReportsTab from "../../components/tabs/reportsTab/ReportsTab";

function Dashboard() {
    const axiosPrivate = useAxiosPrivate();
    const [refresh, setRefresh] = useState(false)

    // tabs navigation
    const [tabId, setTabId] = useState(0);
    const [tabs, setTabs] = useState([
        { label: 'Produkty' },
        { label: 'Kategorie' },
        { label: 'Promocje' },
        { label: 'Użytkownicy' },
        { label: 'Raporty' },
    ]);

    // data
    const [categories, setCategories] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [statuses, setStatuses] = useState<any[]>([])
    const [specialOffers, setSpecialOffers] = useState<any[]>([])
    const [users, setUsers] = useState<any[]>([])
    const [roles, setRoles] = useState<any[]>([])

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
        axios.get('/users').then((response) => {
            setUsers(response.data)
        })
        axios.get('/roles').then((response) => {
            setRoles(response.data)
        })
    }, [refresh])
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

        setTimeout(() => {
            (refresh ? setRefresh(false) : setRefresh(true))
        }, 50)

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

        setTimeout(() => {
            (refresh ? setRefresh(false) : setRefresh(true))
        }, 50)

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

        setTimeout(() => {
            (refresh ? setRefresh(false) : setRefresh(true))
        }, 50)

        return specialOffer
    }

    const updateUser = (user: any) => {
        const data = {
            RoleId: user.RoleId
        }
        const putUser = async () => {
            try {
                await axiosPrivate.put(`/users/${user.id}`, data).then((response) => {
                    console.log(response.data)
                })
            } catch (err) {
                console.log(err)
            }
        }
        putUser();

        setTimeout(() => {
            (refresh ? setRefresh(false) : setRefresh(true))
        }, 50)

        return user
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
                        <UsersTab
                            users={users}
                            roles={roles}
                            update={updateUser} />
                    </TabContent>
                    <TabContent value={tabId} index={4}>
                        <ReportsTab />
                    </TabContent>
                </Box>
            </Paper>
        </Container >
    )
}

export default Dashboard