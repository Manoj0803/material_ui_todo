import React from 'react'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core'
import { yellow,blue,red,green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    test : {
        border : (note) => {
            if(note.category === 'work') {
                return '1px solid red'
            }  
        }
    },
    avatar : {
        background : (note) => {
            if(note.category === 'work') {
                return yellow[700];
            }
            if(note.category === 'todos') {
                return red[500];
            }

            if(note.category === 'reminders') {
                return blue[500];
            }

            return green[500];
        }
    }
})

const NoteCards = ({note,handleDelete}) => {
    
    const classes = useStyles(note)
  
return (
    <div>
        <Card elevation={1} className={classes.test}>
            <CardHeader 
                avatar = {
                    <Avatar className={classes.avatar}>
                        {note.category[0].toUpperCase()}
                    </Avatar>
                }
                action={
                    <IconButton onClick={() => handleDelete(note.id)}>
                        <DeleteOutlined />
                    </IconButton>
                }
                title={note.title}
                subheader={note.category}
            />

            <CardContent>
                <Typography variant='body2' color='textSecondary'>
                    {note.details}
                </Typography>
            </CardContent>

        </Card>
    </div>
  )
}

export default NoteCards
