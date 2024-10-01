import React, { useState } from "react";
import NoteContext from "./NoteContext";
import { toast } from "react-toastify";
// import { json } from "react-router-dom";


function NoteState(props) {
  const host = "http://localhost:5001"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // add note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('Token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const note = await response.json();
   
    setNotes(notes.concat(note));
  };

  // fetch note
  const fetchnote = async () => {

    try {
      const response = await fetch(`${host}/api/notes/fetchnotes`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('Token')
          },
      });

      // Check if response is OK
      if (!response.ok) {
          throw new Error("Error: bad response " );
        }
        const json = await response.json();
        

      setNotes(json);
  } catch (error) {
    console.error("Fetch error: ", error.message);
  }
};

  // delete note
  const deleteNote =async (id) => {
    try {
      // Make an API request to delete the note from the backend
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('Token')
        },
      });
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error(`Error: bad response`);
      }
  
      // If successful, update the state locally
      console.log("Note deleted:", id);
      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      toast.warn('Noted Deleted!');
  
    } catch (error) {
      console.error("Error deleting note: ", error.message);
    }
  };

  // edit note
  const editNote = async (id,title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem('Token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json)

  let newNote = JSON.parse(JSON.stringify (notes));
      for (let index = 0; index < notes.length; index++){
        const element = notes[index];
        if(element._id === id){
          newNote[index].title = title;
          newNote[index] = description;
          newNote[index] = tag;
        }
        break;
        
      }
      setNotes(newNote)
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, addnote, deleteNote, editNote,fetchnote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
