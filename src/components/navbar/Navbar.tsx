import React from 'react'
import { useNavigate } from "react-router-dom"
import './Navbar.scss'

// import MaterialUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// assets
import logo from '../../assets/images/placeholder.png'

const pages = [
    { alt: 'Link1', href: '/link1' },
    { alt: 'Link2', href: '/link2' },
    { alt: 'Link3', href: '/link3' }
];

// href = /profile or /id/profle or /profile/id
const settings = [
    // logged settings
    { alt: 'Profile', href: '/profile', logged: true },
    { alt: 'Account', href: '/account', logged: true },
    { alt: 'Dashboard', href: '/dashboard', logged: true },
    { alt: 'Logout', href: '/logout', logged: true },
    // logout settings
    { alt: 'Login', href: '/login', logged: false },
    { alt: 'Register', href: '/register', logged: false },
];


function Navbar() {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" className='navbar'>
            <Container maxWidth="xl">
                <Toolbar disableGutters className='navbar__content'>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 10, height: 80, width: 20 }} className='navbar__content__logo'>
                        <a href='/'><img src={logo} alt='logo' style={{ height: "100%" }} /></a>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}>
                            {pages.map((page) => (
                                <MenuItem key={page.alt} onClick={() => { handleCloseNavMenu(); navigate(page.href) }}>
                                    <Typography textAlign="center">{page.alt}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 10, height: 80, width: 20 }} className='navbar__content__logo'>
                        <a href='/'><img src={logo} alt='logo' style={{ height: "100%" }} /></a>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.alt}
                                onClick={() => { handleCloseNavMenu(); navigate(page.href) }}
                                sx={{ my: 2, color: 'inherit', display: 'block' }}>
                                {page.alt}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Otwórz ustawienia">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={"Firstname Lastname"} src={"/path/to/image"} className='navbar__content__avatar' />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {settings.map
                                ((setting) => {
                                    if (!setting.logged)
                                        return (
                                            <MenuItem key={setting.alt} onClick={() => { handleCloseUserMenu(); navigate(setting.href) }}>
                                                <Typography textAlign="center">{setting.alt}</Typography>
                                            </MenuItem>
                                        )
                                })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

export default Navbar 