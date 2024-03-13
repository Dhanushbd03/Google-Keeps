// Search.js
import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  function handleSearch() {
    if (!searchTerm) return;

    const textNodes = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let found = false;

    while (textNodes.nextNode()) {
      const node = textNodes.currentNode;
      if (node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase())) {
        found = true;
        const range = document.createRange();
        range.setStart(node, 0);
        range.setEnd(node, node.length);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        // Scroll to the element containing the found text
        node.parentElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      }
    }

    if (!found) {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    }
  }

  function inputChange(event) {
    setSearchTerm(event.target.value);
  }

  function pressEnter(event) {
    event.key === "Enter" && handleSearch();
  }

  return (
    <div className="search">
      <TextField
        className="input"
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={inputChange}
        onKeyDown={pressEnter}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {alertVisible && <Alert severity="error">Content Not found</Alert>}
    </div>
  );
}

export default Search;
