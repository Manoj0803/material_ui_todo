import React, { useEffect , useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { Container } from '@material-ui/core'

import Note from '../components/NoteCards'

export default function Notes() {

  const [notes,setNotes] = useState([])

  useEffect(()=>{
    fetch(' http://localhost:3000/notes')
    .then(response => response.json())
    .then(data => setNotes(data))
  },[])

  const handleDelete = async (id) => {
    await fetch(' http://localhost:3000/notes/' + id, {
      method : 'DELETE'
    })

    const newNotes = notes.filter( (note) => note.id!==id )
    setNotes(newNotes);
  }

  // console.log(notes);
  return (
    <Container style={{height : '100vh'}}>
      <Grid container spacing={3}>
        {notes.map( note => (
          
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <Note key={note.id} note={note} handleDelete={handleDelete}/>
          </Grid>
        ) )}
      </Grid>

    </Container>
  )
}
