import React from 'react'
import Notes from './Notes'
export default function Home(props) {
    const setalert=props.setalert
   
    return (
        <div>
            

           <h1 className="my-3">Add a New Note</h1>
          
          

            
            <Notes setalert={setalert}/>
          
        </div>
    )
}
