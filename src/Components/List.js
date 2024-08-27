import { React, useState } from "react";
import Logo from "../images/BrandLogo.png";
import Search from "./Search";
import SongDetails from "./SongDetails";

function List({ selectedTab,songsList, activeSong, setActiveSong }) {
  const songsTopTrack = [];
  const songsForYou = [];
  if (songsList) {
    songsList.forEach((song) => {
      if (song.top_track === true) {
        songsTopTrack.push(song);
      } else {
        songsForYou.push(song);
      }
    });
  }
  const [filteredTopTrackSongs, setFilteredTopTrackSongs] =
    useState(songsTopTrack);
  const [filteredForYouSongs, setFilteredForYouSongs] = useState(songsForYou);
  return (
    <div className="row g-0">
      <div className="col-lg-3 col-0">
        <div className="d-flex w-100 align-items-start justify-content-between  flex-column">
          {/* <div className="navHeight">
            <img className="logoHeight" src={Logo} alt="spotify" />
          </div> */}
          <div>
            {/* <div
              className=""
              style={{ backgroundColor: "yellow", borderRadius: "50%" }}
            >
              SN
            </div> */}
          </div>
        </div>
      </div>
      <div className="col-lg-9 songsListMainDiv">
        {/* Search */}
        <div className="px-1">
          {selectedTab === "top_tracks" ? (
            <Search
              defaultSongsList={songsTopTrack}
              songsList={filteredTopTrackSongs}
              setSongsList={setFilteredTopTrackSongs}
              activeSong={activeSong}
            />
          ) : (
            <Search
              defaultSongsList={songsForYou}
              songsList={filteredForYouSongs}
              setSongsList={setFilteredForYouSongs}
              activeSong={activeSong}
            />
          )}
        </div>
        {/* List Of Songs */}
        <div className="songsList">
          {selectedTab === "top_tracks" ? (
            filteredTopTrackSongs.length > 0 ? (
              filteredTopTrackSongs.map((item, index) => (
                <SongDetails
                  songdetails={item}
                  setActiveSong={setActiveSong}
                  key={index + "top_tracks"}
                />
              ))
            ) : (
              <div className="songsList">No results</div>
            )
          ) : filteredForYouSongs.length > 0 ? (
            filteredForYouSongs.map((item, index) => (
              <SongDetails
                songdetails={item}
                setActiveSong={setActiveSong}
                key={index + "for_you"}
              />
            ))
          ) : (
            <div className="songsList">No results</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
