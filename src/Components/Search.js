import React from "react";
import { IoIosSearch } from "react-icons/io";

function Search({ defaultSongsList, songsList, setSongsList, activeSong }) {
  const handleChange = (e) => {
    let value = e.target.value;
    if (value !== "") {
      const filteredSongs = defaultSongsList.filter((song) =>
        song.name.toLowerCase().includes(value.toLowerCase())).sort((a, b) => {
          return (
            a.name.toLowerCase().indexOf(value.toLowerCase()) -
            b.name.toLowerCase().indexOf(value.toLowerCase())
          );
      }
      );
      setSongsList(filteredSongs);
    }
    else{
      setSongsList(defaultSongsList);
    }
  };
  return (
    <div className="searchDiv" style={activeSong ? { backgroundColor: activeSong?.accent }:{ backgroundColor: "lightblue" }}>
      <input
        className="searchInput"
        type="text"
        placeholder="Search Song, Artist"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <IoIosSearch style={{ width: "19px" }} />
    </div>
  );
}

export default Search;
