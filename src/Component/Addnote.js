import React, { useContext, useState } from "react";
import NoteContext from "../Context/notes/NoteContext";
import { toast } from "react-toastify";

function Addnote() {
  const context = useContext(NoteContext);
  const { addnote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    console.log(setNote);
  };

  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
  setNote({ title: "", description: "", tag: "" })
  toast.success('Noted added successfully!');
  };

  return (
    <div>
      <h1>Add Your Note</h1>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={handleChange} minLength={2} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            id="description"
            value={note.description}
            onChange={handleChange} minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={handleChange} minLength={2} required />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled={note.title.length<2 || note.description.length<5 || note.tag.length<2 } >
          Add
        </button>
      </form>
    </div>
  );
}

export default Addnote;
