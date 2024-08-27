import { React, useState, useEffect } from "react";
import Logo from "../images/BrandLogo.png";
import Search from "./Search";
import SongDetails from "./SongDetails";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserProfile from "../images/Profile.png";

function List({
  selectedTab,
  topTrackSongs,
  forYouSongs,
  activeSong,
  setActiveSong,
  setSelectedTab,
  openSideBar,
  setOpenSideBar,
  lightenColor,
}) {
  const [filteredTopTrackSongs, setFilteredTopTrackSongs] = useState([]);
  const [filteredForYouSongs, setFilteredForYouSongs] = useState([]);
  useEffect(() => {
    setFilteredTopTrackSongs(topTrackSongs);
  }, [topTrackSongs]);
  useEffect(() => {
    setFilteredForYouSongs(forYouSongs);
  }, [forYouSongs]);

  return (
    <div className="row g-0">
      <div className="col-lg-3 col-0">
        <div className="d-none d-lg-flex postion-relative">
          {/* <div className="navHeight">
            <img className="logoHeight" src={Logo} alt="spotify" />
          </div> */}
          <div className="userImageIcon">
            <img src={UserProfile} alt="A" style={{height:"35px"}} />
          </div>
        </div>
      </div>
      <div className="col-lg-9 songsListMainDiv d-lg-block d-md-block d-none">
        {/* Search */}
        <div className="px-1">
          {selectedTab === "top_track" ? (
            <Search
              defaultSongsList={topTrackSongs}
              songsList={filteredTopTrackSongs}
              setSongsList={setFilteredTopTrackSongs}
              activeSong={activeSong}
            />
          ) : (
            <Search
              defaultSongsList={forYouSongs}
              songsList={filteredForYouSongs}
              setSongsList={setFilteredForYouSongs}
              activeSong={activeSong}
            />
          )}
        </div>
        {/* List Of Songs */}
        <div className="songsList d-none d-md-block d-lg-block">
          <div className="d-none d-md-flex d-lg-none gap-2 px-2">
            <div
              onClick={() => {
                setSelectedTab("for_you");
              }}
              className={`${
                selectedTab === "for_you"
                  ? "songsListTabMenuFontActive"
                  : "songsListTabMenuFont"
              }`}
            >
              For You
            </div>
            <div
              onClick={() => {
                setSelectedTab("top_track");
              }}
              className={`${
                selectedTab === "top_track"
                  ? "songsListTabMenuFontActive"
                  : "songsListTabMenuFont"
              }`}
            >
              Top Tracks
            </div>{" "}
          </div>
          {selectedTab === "top_track" ? (
            filteredTopTrackSongs.length > 0 ? (
              filteredTopTrackSongs.map((item, index) => (
                <SongDetails
                  songdetails={item}
                  setActiveSong={setActiveSong}
                  key={index + "top_track"}
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

        {/* Mobile Drawer Component */}
        <Offcanvas
          show={openSideBar}
          onHide={() => {
            setOpenSideBar(false);
          }}
          scroll={true}
          backdrop={true}
          style={
            activeSong
              ? {
                  background: `linear-gradient(to right, ${lightenColor(
                    activeSong.accent,
                    20
                  )}, ${activeSong.accent})`,
                  width: "75%",
                }
              : {
                  background: "linear-gradient(to right,#296E85,purple)",
                  width: "75%",
                }
          }
        >
          {/* <Offcanvas.Header closeButton>
        </Offcanvas.Header> */}
          <Offcanvas.Body>
            {selectedTab === "top_track" ? (
              <Search
                defaultSongsList={topTrackSongs}
                songsList={filteredTopTrackSongs}
                setSongsList={setFilteredTopTrackSongs}
                activeSong={activeSong}
              />
            ) : (
              <Search
                defaultSongsList={forYouSongs}
                songsList={filteredForYouSongs}
                setSongsList={setFilteredForYouSongs}
                activeSong={activeSong}
              />
            )}

            <div
              onClick={() => {
                setSelectedTab("for_you");
              }}
              className={`${
                selectedTab == "for_you"
                  ? "songsListTabMenuFontActive"
                  : "songsListTabMenuFont"
              }`}
            >
              For You
            </div>
            <div className="toggleBar">
              {selectedTab == "for_you" &&
                (filteredForYouSongs.length > 0 ? (
                  filteredForYouSongs.map((item, index) => (
                    <SongDetails
                      songdetails={item}
                      setActiveSong={setActiveSong}
                      key={index + "top_track"}
                    />
                  ))
                ) : (
                  <div className="songsList">No results</div>
                ))}
            </div>
            <div
              onClick={() => {
                setSelectedTab("top_track");
              }}
              className={`${
                selectedTab == "top_track"
                  ? "songsListTabMenuFontActive"
                  : "songsListTabMenuFont"
              }`}
            >
              Top Tracks
            </div>
            <div className="toggleBar">
              {selectedTab == "top_track" &&
                (filteredTopTrackSongs.length > 0 ? (
                  filteredTopTrackSongs.map((item, index) => (
                    <SongDetails
                      songdetails={item}
                      setActiveSong={setActiveSong}
                      key={index + "top_track"}
                    />
                  ))
                ) : (
                  <div className="songsList">No results</div>
                ))}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
}

export default List;
