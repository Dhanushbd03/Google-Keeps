import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Axios from "axios";

function Form(props) {
  const storedNote = JSON.parse(localStorage.getItem("note"));
  const [note, setNote] = useState(storedNote || { title: "", content: "" });
  const Notes = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("http://localhost:3000/notes", {
        title: note.title,
        content: note.content,
        userid: props.userid,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function handlechange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }
  function handleClick(event) {
    props.onadd(note);
    event.preventDefault();
    return setNote({
      title: "",
      content: "",
    });
  }
  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(note));
  }, [note]);

  return (
    <div>
      <form onSubmit={Notes} className="create-note">
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={handlechange}
        />
        <textarea
          name="content"
          type="text"
          placeholder="Take a Note"
          rows="3"
          value={note.content}
          onChange={handlechange}
        />
        <button
          onClick={(e) => {
            Notes(e);
            handleClick(e);
          }}
          style={{background:props.color}}
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}
export default Form;
