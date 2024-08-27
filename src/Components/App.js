import { React, useEffect, useState } from "react";
import ListOfSongs from "./List.js";
import "../styles/App.css";
import Player from "./Player.js";
import { Spinner } from "react-bootstrap";
import Logo from "../images/BrandLogo.png";
import UserProfile from "../images/Profile.png";
import { IoMenuSharp } from "react-icons/io5";
function App() {
  const [activeSong, setActiveSong] = useState(null);
  const [songsList, setSongsList] = useState(null);
  const [selectedTab, setSelectedTab] = useState("for_you");
  const [openSideBar,setOpenSideBar] = useState(false);
  useEffect(() => {
    fetch("https://cms.samespace.com/items/songs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        setSongsList(res.data);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
      });
  }, []);
  function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;

    return `rgb(${R < 255 ? R : 255}, ${G < 255 ? G : 255}, ${
      B < 255 ? B : 255
    })`;
  }

  return (
    <div
      className="mainDiv"
      style={
        activeSong
          ? {
              background: `linear-gradient(to right, ${lightenColor(
                activeSong.accent,
                20
              )}, ${activeSong.accent})`,
            }
          : { background: "linear-gradient(to right,#296E85,purple)" }
      }
    >
      {/* Desktop naviagtion Bar */}
      <div className="row g-0 d-none d-lg-block">
        <div className="col-lg-6 ">
          <div className="row g-0 navHeight ">
            <div className="col-lg-3 px-2">
              <img className="logoHeight" src={Logo} alt="spotify" />
            </div>
            <div className="d-flex gap-4 songsListMainDiv col-lg-9">
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
              <div
                onClick={() => {
                  setSelectedTab("top_tracks");
                }}
                className={`${
                  selectedTab == "top_tracks"
                    ? "songsListTabMenuFontActive"
                    : "songsListTabMenuFont"
                }`}
              >
                Top Tracks
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile naviagtion Bar */}

      <div className="d-lg-none d-flex align-items-center justify-content-between">
        <div className="d-md-none d-block">
        <IoMenuSharp className="logoHeight" onClick={()=>{}}  />
        </div>
        <div>
            <img src={Logo} alt="spotify"></img>
        </div>
        <div>
            <img src={UserProfile} alt="A"></img>
        </div>
      </div>

      <div className="row g-0">
        <div className="col-lg-6 col-md-3">
          {songsList && (<>
            <div className="d-lg-block d-md-block d-none">
              <ListOfSongs
                selectedTab={selectedTab}
                songsList={songsList}
                activeSong={activeSong}
                setActiveSong={setActiveSong}
              />
            </div>
            </>
          )}
        </div>
        <div className="col-lg-6 col-sm-12 col-md-9">
          {activeSong && <Player activeSong={activeSong} />}
        </div>
      </div>
    </div>
  );
}

export default App;
