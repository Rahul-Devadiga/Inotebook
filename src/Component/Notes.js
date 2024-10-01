import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Notes() {
  const navigate = useNavigate();
  
    const context = useContext(NoteContext);
    const {notes, fetchnote, editNote } = context

    useEffect(()=>{
      if(localStorage.getItem("Token")){
        fetchnote();
      }else{
        navigate('/Login')
      }

    },[fetchnote,navigate])

    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setNote] = useState({id:"", title: "", description: "", tag: "" });

    const updateNote =(currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag });
    }


    const handleChange = (e) => {
      setNote({ ...note, [e.target.name]: e.target.value });
      console.log(setNote);
    };
  
    const handleClick = (e) => {
      editNote(note.id , note.title,note.description, note.tag)
      refclose.current.click();
      toast.success('Note Updated successfully');
    };

  return (
    <div className="row my-3">
      <h2>Your Notes</h2>
      <div className="container mx-1" >
      {notes.length===0 && "Not Notes To Display"}
      </div>
      {notes.map((notes) => {
        return <Noteitem key={notes._id} notes={notes} updateNote={updateNote}/>;
      })}

{/* Button trigger modal */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* Modal */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel"> Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form>
<div className="mb-3">
<label htmlFor="exampleInputEmail1" className="form-label">Title</label>
<input type="text" className="form-control" value={note.title} id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} minLength={2} required />
</div>
<div className="mb-3">
<label htmlFor="exampleInputPassword1" className="form-label">Description</label>
<input type="text" className="form-control" value={note.description} name='description' id="description" onChange={handleChange} minLength={5} required/>
</div>
<div className="mb-3">
<label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
<input type="text" className="form-control" value={note.tag} name='tag' id="tag"  minLength={2} required/>
</div>

</form>

      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
        <button disabled={note.title.length<2 || note.description.length<5 || note.tag.length<2 } type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Notes;
