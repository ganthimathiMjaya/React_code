import React, {useState} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Container, useMediaQuery } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import arcKnolLogo from '../../assets/arc_knol.svg';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import '../ArticleCreation/ArticleTable.css'
import { useNavigate } from 'react-router-dom';
import userProfileImage from '../../assets/arc_knol.JPG';
// import auth from 'react-compo-auth-package';

const Header = () => {
    const [auth, setValue] = useState("Ganthi");
    const matches = useMediaQuery('(max-width:480px)');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };
    
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{ backgroundColor: '#215d89' }}>
                <Toolbar disableGutters >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={arcKnolLogo} alt="arc.knol" style={{ height: '55px', marginRight: '16px' }} />
                    </Box>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>


                        {matches ?
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                                <Tooltip title="Account settings">
                                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            :
                            <>

                                <Typography variant="body1" sx={{ marginRight: '16px' }}>
                                    {currentDate}
                                </Typography>
                                <IconButton color="inherit">
                                    <EmojiEmotionsIcon />
                                </IconButton>
                                <Typography variant="body1" sx={{ marginRight: '16px' }}>
                                    GanthiMathi M
                                </Typography>
                                <Avatar alt='Ganthi' src='https://via.placeholder.com/24/avatar.jpg' />

                            </>

                        }
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <Avatar><EmojiEmotionsIcon /></Avatar>
                                GanthiMathi M
                            </MenuItem>
                            <MenuItem>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>


                    </Box>
                </Toolbar>
            </Container>
            <Toolbar fullWidth sx={{ backgroundColor: '#15426c' }}>
                <Box>
                    <Button color="inherit" className='custom-font' onClick={() => handleNavigation('/articletable')}>Article Creation</Button>
                    <Button color="inherit" className='custom-font' onClick={() => handleNavigation('/approvalTable')}>Article Approval</Button>
                    {auth === 'Ganthi' ? <Button color="inherit" className='custom-font' onClick={() => handleNavigation('/listTable')}>List of Value Setup</Button>: ''}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
