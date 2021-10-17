import React from "react";

export default function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-3 my-3">
      <div class="card">
        <h5 class="card-header">{note.title}</h5>
        <div class="card-body">
          <h6 class="card-title">{note.tag}</h6>
          <p class="card-text">
           {note.description}
          </p>
         
        </div>
      </div>
    </div>
  );
}
