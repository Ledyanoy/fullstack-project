import React, {useState} from "react";
import {Link as RouterLink} from 'react-router-dom'

import {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, TextField} from "@material-ui/core"

import DehazeIcon from '@material-ui/icons/Dehaze'
import MailIcon from '@material-ui/icons/Mail'
import HomeIcon from '@material-ui/icons/Home'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import DashboardIcon from '@material-ui/icons/Dashboard'


const  SideDrawer = (props) => {

    const [drawer, setDrawer] = useState(false)

    return (
        <>
            <DehazeIcon className='drawer_btn'
                        onClick={() => setDrawer(true)}
            />
            <Drawer anchor={'right'} open={drawer} onClose={() => setDrawer(false)}>
                <form style={{margin: '20px'}} action="">
                    <TextField id='outlined-basic' label='Search movie' variant='outlined'/>
                </form>
                <Divider/>
                <List>
                    <ListItem button component={RouterLink} to='/' onClick={() => setDrawer(false)}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Home'/>
                    </ListItem>
                    <ListItem button component={RouterLink} to='/contact' onClick={() => setDrawer(false)}>
                        <ListItemIcon>
                            <MailIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Contact'/>
                    </ListItem>
                    <ListItem button component={RouterLink} to='/auth' onClick={() => setDrawer(false)}>
                        <ListItemIcon>
                            <VpnKeyIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Sign In'/>
                    </ListItem>
                    <ListItem button component={RouterLink} to='/auth' onClick={() => setDrawer(false)}>
                        <ListItemIcon>
                            <VpnKeyIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Sign Out'/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem button component={RouterLink} to='/dashboard' onClick={() => setDrawer(false)}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Dashboard'/>
                    </ListItem>
                </List>
            </Drawer>

        </>
    )
}

export default SideDrawer
