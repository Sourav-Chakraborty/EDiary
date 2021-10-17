//in this file we will define all the state reguarding to note
import React,{useState} from "react";
import NoteContext from "./noteContext";

const NoteState=(props)=>{
   const notesInitial=
    [
        {
          "_id": "6162d2ad62e435b688d059e5",
          "user": "6162d29362e435b688d059e3",
          "title": "Updating notes",
          "description": "Saving the first note",
          "tag": "general",
          "date": "2021-10-10T11:46:53.127Z",
          "__v": 0
        },
        {
          "_id": "6162d31a62e435b688d059e8",
          "user": "6162d29362e435b688d059e3",
          "title": "FirstNote",
          "description": "Saving the first note",
          "tag": "general",
          "date": "2021-10-10T11:48:42.978Z",
          "__v": 0
        },
        {
          "_id": "6162d35799521cb6fc2d4934",
          "user": "6162d29362e435b688d059e3",
          "title": "FirstNote",
          "description": "Saving the first note",
          "tag": "general",
          "date": "2021-10-10T11:49:43.215Z",
          "__v": 0
        },
        {
          "_id": "61659b724b8f32ef0138a7fb",
          "user": "6162d29362e435b688d059e3",
          "title": "FirstNote",
          "description": "Saving the first note",
          "tag": "general",
          "date": "2021-10-12T14:28:02.796Z",
          "__v": 0
        },
        {
          "_id": "61659b724b8f32ef0138a7fe",
          "user": "6162d29362e435b688d059e3",
          "title": "Updating notes",
          "description": "Saving the first note",
          "tag": "general",
          "date": "2021-10-12T14:28:02.917Z",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)
    
    
    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
 

export default NoteState