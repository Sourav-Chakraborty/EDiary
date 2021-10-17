import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
   const notesInitial =[]
   const [notes, setNotes] = useState(notesInitial);

  const getAllNotes=async ()=>{
    const respon = await fetch(`${host}/api/notes/getallnotes`, {
      method: 'GET',

      headers: {
        
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MmQyOTM2MmU0MzViNjg4ZDA1OWUzIn0sImlhdCI6MTYzMzg2NjM4N30.3UZ-kQv7HjVEflydpTgJwjOyjHdhPKboP1EWuA3w1zQ",
        "Content-Type": "application/json"
          
      }

    });
    const json=await respon.json()
  
    setNotes(json)
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`$(host)/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MmQyOTM2MmU0MzViNjg4ZDA1OWUzIn0sImlhdCI6MTYzMzg2NjM4N30.3UZ-kQv7HjVEflydpTgJwjOyjHdhPKboP1EWuA3w1zQ",
      },

      body: JSON.stringify({title, description, tag}), 
    });

    
    const note = {
      _id: "61322f119553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a0664",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    const newNote=notes.concat(note)
    setNotes(newNote);
    
  };

  // Delete a Note
  const deleteNote = (id) => {
    console.log("Deleting the note ", id);
    const newNotes = notes.filter((note) => note._id !== id);
    
    setNotes(newNotes);
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/$(id)`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2MmQyOTM2MmU0MzViNjg4ZDA1OWUzIn0sImlhdCI6MTYzMzg2NjM4N30.3UZ-kQv7HjVEflydpTgJwjOyjHdhPKboP1EWuA3w1zQ",
      },

      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });

    // logic to edit
    for (var i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider value={{notes,getAllNotes,addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
