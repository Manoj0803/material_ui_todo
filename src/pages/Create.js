import { Typography,Button,Container,makeStyles, Radio, FormControlLabel, FormLabel, FormControl } from '@material-ui/core'
import React, {useState} from 'react'
import SendIcon from '@mui/icons-material/Send';
import { TextField,RadioGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({

  field : {
    marginTop : 20,
    marginBottom : 20,
    display : 'block'
  }

  // btn : {
  //   fontSize : 60,
  //   backgroundColor : 'violet',
  //   '&:hover' : {
  //     backgroundColor : 'blue'
  //   }
  // },
  // title : {
  //   textDecoration : 'underline',
  //   marginBottom : 20,
  // }
})


export default function Create() {
  
  const classes = useStyles()
  
  const [title,setTitle] = useState('')
  const [detail,setDetail] = useState('')
  
  const [titleError,setTitleError] = useState(false)
  const [detailError,setDetailError] = useState(false)

  const [category,setCategory] = useState('todos')

  const history = useHistory();
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!title) {
      setTitleError(true);
    }

    if(!detail) {
      setDetailError(true);
    }

    if(title && detail) {

      fetch(' http://localhost:3000/notes', {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify({title,detail,category})
      }).then(() => history.push('/'));

      setTitle('');
      setDetail('');
      setCategory('todos');
      setTitleError(false);
      setDetailError(false);
    }
  }

  return (
    <Container style={{heiht : '100vh'}}>
      <Typography
        variant='h6'
        color='textSecondary'
        component='h2'
        gutterBottom
      >
        Create a New Note
      </Typography>
    
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>

        <TextField
          value={title}
          onChange={(e)=> setTitle(e.target.value)}
          className={classes.field}
          label = 'Note Title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          error={titleError}
        >
        </TextField>


        <TextField
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className={classes.field}
          label = 'Detail'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          error={detailError}
        >
        </TextField>

        <FormControl className={classes.field}>
          <FormLabel>
            Note Cateogry
          </FormLabel>

          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio/>} label='Money'/>
            <FormControlLabel value='todos' control={<Radio/>} label='Todos'/>
            <FormControlLabel value='reminders' control={<Radio/>} label='Reminders'/>
            <FormControlLabel value='work' control={<Radio/>} label='Work'/>

          </RadioGroup>
        </FormControl>
        <Button 
          className={classes.btn}
          type='submit'
          color='secondary'
          variant='contained'
          startIcon={<SendIcon/>}
        >
          submit
        </Button>

      </form>




    </Container>
  )
}
