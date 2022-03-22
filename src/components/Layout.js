import { Box, makeStyles,AppBar, Avatar } from '@material-ui/core'

import React from 'react'
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AddCircleOutline, SubjectOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { format } from 'date-fns';
import { red } from '@material-ui/core/colors';


const drawerWidth = 240

const useStyles = makeStyles((theme) => {

    return {
        page:{
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer : {
            width: drawerWidth
        },
        drawerPaper : {
            width: drawerWidth
        },
        root : {
            display: 'flex'
        },
        active : {
            background : '#f4f4f4'
        },
        title : {
            padding : theme.spacing(2)
        },
        appbar : {
            width : `calc(100% - ${drawerWidth}px)`
        },
        toolbar : theme.mixins.toolbar,
        avatar : {
            background : red[500]
        },
        spacing : {
            flexGrow : 1
        }
    }
})

const Layout = ({children}) => {

    const history = useHistory();
    const location = useLocation('/');
    const classes = useStyles();

    const menuItems = [
        {
            text : 'My Notes',
            icon : <SubjectOutlined color='secondary'/>,
            path : '/'
        },
        {
            text : 'Create Notes',
            icon : <AddCircleOutline color='secondary'/>,
            path : '/create'
        }
    ]

  return (
    <div className={classes.root}>

        {/* app bar */}

        <AppBar
            className={classes.appbar}
            elevation={1}
        >
            <Toolbar>
                <Typography className={classes.spacing}>
                    Welcome to the Notes, {format(new Date(),'do MMMM Y')}
                </Typography>

                <Avatar className={classes.avatar}>
                    M
                </Avatar>

            </Toolbar>
        </AppBar>

        {/* side drawer */}
        <Drawer 
            className={classes.drawer}
            variant='permanent'
            anchor='left'
            classes={{ paper: classes.drawerPaper}}
        >
            <div>
                <Typography variant='h5' className={classes.title}>
                    Notes
                </Typography>

                {/* List / Links */}
                <List>
                    {menuItems.map( item => (
                        <ListItem 
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : console.log(item.path,location.pathname)}    
                        >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text}/>
                        </ListItem>

                    ))}
                </List>


            </div>
        </Drawer>
       

        <div className={classes.page}>
             <div className={classes.toolbar}></div>
            {children}
        </div>

    </div>
  )
}

export default Layout
