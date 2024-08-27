import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";
import { CiCircleMore } from "react-icons/ci";
import "react-h5-audio-player/lib/styles.css";

const MoreOptions = () => (
  <div className="pointer" onClick={() => {}}>
    <CiCircleMore size="25px" />
  </div>
);

const ProgressNext = () => (
  <div className="pointer" onClick={() => {}}>
    <TbPlayerTrackNextFilled />
  </div>
);

const ProgressPrev = () => (
  <div className="pointer" onClick={() => {}}>
    <TbPlayerTrackPrevFilled />
  </div>
);

function Player({ activeSong }) {
  const [playerImg, setPlayerImg] = useState(null);
  useEffect(() => {
    fetch(`https://cms.samespace.com/assets/${activeSong.cover}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((res) => {
        const imgUrl = URL.createObjectURL(res);
        setPlayerImg(imgUrl);
      })
      .catch((err) => {
        console.error("Error fetching songs:", err);
      });
  }, [activeSong]);

  return (
    <div className="playerDiv">
      <div className="playerTextCont">
        <h2 className="playerSongName">{activeSong.name}</h2>
        <p className="playerArtistName">{activeSong.artist}</p>
      </div>
      <div className="playerImageContainer">
        <img
          className="playerCoverImg"
          src={playerImg ? playerImg : activeSong.cover}
          alt={activeSong.cover}
        />
      </div>
      <div className="custom-audio-player">
        <div className="audioPlayer">
          <AudioPlayer
            autoPlay={false}
            src={activeSong.url}
            showJumpControls={false}
            hasDefaultKeyBindings={false}
            customProgressBarSection={["PROGRESS_BAR"]}
            customControlsSection={[
              <MoreOptions />,
              <ProgressPrev />,
              "MAIN_CONTROLS",
              <ProgressNext />,
              "VOLUME_CONTROLS",
            ]}
            style={{
              backgroundColor: "inherit",
              color: "#fff",
              boxShadow: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Player;
