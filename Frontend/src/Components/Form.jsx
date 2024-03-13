import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function Form(props) {
  const storedNote = JSON.parse(localStorage.getItem("note"));
  const [note, setNote] = useState(storedNote || { title: "", content: "" });


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
    },[note])
  return (
    <div>
      <form action="" className="create-note">
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
        <button onClick={handleClick}>
          <AddIcon />
        </button>
      </form>
    </div>
  );
}
export default Form;
