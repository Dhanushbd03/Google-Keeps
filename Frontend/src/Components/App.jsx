// App.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import Form from "./Form.jsx";
import Axios from "axios";

function App() {
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState("landscape");
  const [color, setColor] = useState("black");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, notes]);

  const getNotes = async () => {
    const response = await Axios.post("http://localhost:3000/getNotes", {
      user: user,
    });
    setNotes(response.data.notes);
  };

  const handleuser = (data) => {
    setUser(data);
  };

  const pexel = async () => {
    const response = await Axios.get(
      "https://api.pexels.com/v1/search?query=nature",
      {
        headers: {
          Authorization:
          import.meta.env.VITE_PEXEL_API,
        },
      }
    );
    const photos = response.data.photos;
    const randomNum = Math.floor(Math.random() * photos.length);

    setImages(photos[randomNum].src.landscape);
    setColor(photos[randomNum].avg_color);
  };
  useEffect(() => {
    pexel();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        pexel(); // Fetch new image when tab becomes visible
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  function addNote(note) {
    setNotes((prevNotes) => {
      return [...prevNotes, note];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return noteItem.id !== id;
      });
    });
  }

  return (
    <div id="main" style={{ backgroundImage: `url(${images})` }}>
      <Header color={color} handleuser={handleuser} />
      <>
        <Form onadd={addNote} color={color} user_id={user} />
        <div id="notes">
          {notes &&
            notes.map((noteItem, index) => {
              return noteItem.title || noteItem.content ? (
                <Note
                  color={color}
                  key={index}
                  id={noteItem.id}
                  title={noteItem.title}
                  content={noteItem.content}
                  onDelete={deleteNote}
                  user_id={user}
                />
              ) : null;
            })}
        </div>
      </>
      <Footer />
    </div>
  );
}

export default App;
