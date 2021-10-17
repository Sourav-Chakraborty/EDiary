import React,{useContext} from 'react'
import AddNotes from './AddNotes.js'
import NoteItem from './NoteItem.js'
import noteContext from "../context/notes/noteContext.js"

export default function Notes() {
    const context=useContext(noteContext)
    const {notes}=context
    return (
        <div>
        <AddNotes/>
         <h1>All Your Notes</h1>
             <div className="row ">
               {notes.map((note)=>{
                   return <NoteItem note={note} key={note._id}/>
               })}
           </div>
        </div>
    )
}
