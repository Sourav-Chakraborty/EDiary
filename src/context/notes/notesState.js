import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
   const notesInitial =[]
   const [notes, setNotes] = useState(notesInitial);

  const getAllNotes=async ()=>{
    console.log('token in localstroge',localStorage.getItem('token'))
    const respon = await fetch(`${host}/api/notes/getallnotes`, {
      method: 'GET',

      headers: {
        
        "auth-token":
        localStorage.getItem('token')
          
      }

    });
    const json=await respon.json()
  
    setNotes(json)
  }


  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

      body: JSON.stringify({title, description, tag}), 
    });
    const json=await response.json()
    console.log(json)
    
    
    getAllNotes()
    
  };

  // Delete a Note
  const deleteNote = async (id) => {
    console.log("Deleting the note ", id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

    });
    const json=await response.json()
    console.log(json)

    
    
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // api call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },

      body: JSON.stringify({title,description,tag}), 
    });
    const json=await response.json()
    getAllNotes()
   
  };

  return (
    <NoteContext.Provider value={{notes,getAllNotes,addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
