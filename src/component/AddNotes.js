import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"
const AddNote = (props) => {
    const setalert=props.setalert
    const context = useContext(noteContext);
    const {addNote} = context;
  
    const [note, setNote] = useState({title: "", description: "", tag: "default"})

    const handleClick = (e)=>{
        e.preventDefault();
        if(note.title.length===0)
            alert("Make sure title is atleast one charecter")
        else if(note.description.length<5)
            alert("Make sure title is atleast 5 charecter")
        else{  
            addNote(note.title, note.description, note.tag);
            setalert({type:"success",msg:"Congrats note added"})
            setTimeout(() => {
            setalert({type:null,msg:""})
              
            }, 4000);
            setNote({title: "", description: "", tag: "default"})

        }
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
      
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title}  type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input value={note.description}    type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote