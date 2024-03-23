// App.jsx
import React, { useEffect, useState } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import Form from "./Form.jsx";
import Signup from "./Signup.jsx";
import Axios from "axios";

function App() {
  const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
  const storedState = JSON.parse(localStorage.getItem("isloggedin"));
  const [notes, setNotes] = useState(storedNotes);
  const [isloggedin, setIsloggedin] = useState(storedState);
  const [images, setImages] = useState("landscape");
  const [color, setColor] = useState("black");

  const pexel = async () => {
    const response = await Axios.get(
      "https://api.pexels.com/v1/search?query=nature",
      {
        headers: {
          Authorization:
            "wADIdebqijYiFz80CvEu7byeUxQm6AjA99x1NGwbhxuksvfohGavsaug",
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
        return index !== id;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("isloggedin", JSON.stringify(isloggedin));
  }, [isloggedin]);

  return (
    <div id="main" style={{ backgroundImage: `url(${images})` }}>
      <Header
        isloggedin={isloggedin}
        setIsloggedin={setIsloggedin}
        color={color}
      />
      {isloggedin ? (
        <>
          <Form onadd={addNote} color={color} />
          <div id="notes">
            {notes &&
              notes.map((noteItem, index) => {
                return noteItem.title || noteItem.content ? (
                  <Note
                    color={color}
                    key={index}
                    id={index}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                  />
                ) : null;
              })}
          </div>
        </>
      ) : (
        <Signup setIsloggedin={setIsloggedin} color={color} />
      )}
      <Footer />
    </div>
  );
}

export default App;
