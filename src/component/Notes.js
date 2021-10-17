import React,{useContext} from 'react'
import noteContext from "../context/notes/noteContext.js"
import NoteItem from './NoteItem.js'

export default function Notes() {
    const context=useContext(noteContext)
    const {notes,setNotes}=context
    return (
        <div>
         <h1>All Your Notes</h1>
             <div className="row ">
               {notes.map((note)=>{
                   return <NoteItem note={note}/>
               })}
           </div>
        </div>
    )
}
