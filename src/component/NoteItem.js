import React,{useContext} from "react";
import noteContext from "../context/notes/noteContext"
export default function NoteItem(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;

  const { note } = props;
  return (
    <div className="col-3 my-3">
      <div className="card">
        <h5 className="card-header">{note.title}</h5>
        <div className="card-body">
          <h6 className="card-title">{note.tag}</h6>
          <p className="card-text">
           {note.description}
          </p>
          <h6>{note.date}</h6>
          <i className="fas fa-trash-alt mx-3" onClick={()=> deleteNote(note._id)}>Delete</i>
          <i className="fas fa-edit">Edit</i>
        </div>
      </div>
    </div>
  );
}
