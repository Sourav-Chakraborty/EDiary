import React, { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";

import AddNotes from "./AddNotes.js";
import NoteItem from "./NoteItem.js";
import noteContext from "../context/notes/noteContext.js";

export default function Notes(props) {
  const history = useHistory();

  const setalert = props.setalert;
  const ref = useRef(null);
  const context = useContext(noteContext);
  const { notes, editNote, getAllNotes } = context;
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "default",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) getAllNotes();
    else history.push("/signin");
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    setNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
    ref.current.click();
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (note.title.length === 0)
      alert("Make sure title is atleast one charecter");
    else if (note.description.length < 5)
      alert("Make sure title is atleast 5 charecter");
    else {
      editNote(note.id, note.title, note.description, note.tag);
      setalert({ type: "success", msg: "Congrats edit sucessful" });
      setTimeout(() => {
        setalert({ type: null, msg: "" });
      }, 4000);
    }
    document.getElementById("X").click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <AddNotes setalert={setalert} />

      <button
        ref={ref}
        data-toggle="modal"
        data-target="#exampleModal"
        style={{ border: "none" }}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                id="X"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={note.title}
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.description}
                    id="description"
                    name="description"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.tag}
                    id="tag"
                    name="tag"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h1>All Your Notes</h1>
      <div className="row ">
        {notes.length === 0 && <h1 className="text-center">No Note to show</h1>}
        {notes.map((note) => {
          return (
            <NoteItem
              setalert={setalert}
              updateNote={updateNote}
              note={note}
              key={note._id}
            />
          );
        })}
      </div>
    </div>
  );
}
