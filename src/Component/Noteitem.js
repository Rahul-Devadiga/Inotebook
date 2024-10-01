import React, { useContext } from 'react'
import NoteContext from "../Context/notes/NoteContext";

function Noteitem(props) {   
  const context = useContext(NoteContext);
  const { deleteNote } = context

  const {notes,updateNote}= props
  


  return (
    
    <div className="col-md-3" >
    <div className="card my-3" >
    <div className="card-body">
    <h5 className="card-title"> {notes.title} </h5>
    <p className="card-text">{notes.description} <br/>
   
    <i className="fa-solid fa-trash mx-2 my-2" onClick={()=>{deleteNote(notes._id)}}></i>
    <i className="fa-solid fa-pen mx-2" onClick={()=>{updateNote(notes)}}></i>
 
    </p>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
    </div>
    </div>
  )
}

export default Noteitem