import DeleteIcon from "@mui/icons-material/Delete";
import Axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useState, useEffect } from "react";
import Alert from "@mui/joy/Alert";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const deleteNote = async () => {
    try {
      const response = await Axios.post("https://google-keeps.onrender.com/deleteNotes", {
        notes_id: props.id,
      });

      const message = response.data.message;
      console.log(props.id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const updateNote = async () => {
    const response = await Axios.put("https://google-keeps.onrender.com/updateNote", {
      title: editedTitle,
      content: editedContent,
      id: props.id,
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteNote();
      props.onDelete(props.id);
    } catch (error) {
      console.error("Error handling delete:", error);
    }
  };

  return (
    <>
      {isEditing ? (
        <div className="note">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={{ border: "none", padding: "10px" }}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{
              border: "none",
              padding: "10px",
            }}
          ></textarea>

          <SaveIcon sx={{ alignSelf: "flex-end" }} onClick={updateNote} />
        </div>
      ) : (
        <div className="note">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <EditIcon
              style={{ color: props.color, alignSelf: "flex-end" }}
              onClick={() => {
                setIsEditing(true);
              }}
            />
            <DeleteIcon
              onClick={handleDelete}
              style={{ color: props.color, alignSelf: "flex-end" }}
            />
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default Note;
