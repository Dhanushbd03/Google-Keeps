import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import Form from "./Form.jsx";


function App() {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || []; // Ensure initial state is not null
  const [notes, setNotes] = useState(storedNotes);

  function addNote(note) {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div id="main">
      <Header />
      
      <Form onadd={addNote} />
      <div id="notes">
        {notes && notes.map((noteItem, index) => {
          // Assuming you want to skip rendering notes without title and content
          return (noteItem.title || noteItem.content) ? (
            <Note
              key={index}
              id={index}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          ) : null;
        })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
