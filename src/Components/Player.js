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

const ProgressNext = ({handleNextPrevious,song}) => (
  <div className="pointer" onClick={() => {handleNextPrevious(song,"next")}}>
    <TbPlayerTrackNextFilled />
  </div>
);

const ProgressPrev = ({handleNextPrevious,song}) => (
  <div className="pointer" onClick={() => {handleNextPrevious(song,"prev")}}>
    <TbPlayerTrackPrevFilled />
  </div>
);

function Player({ activeSong,handleNextPrevious }) {
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
          loading='lazy'
          fetchPriority='high'
          className="playerCoverImg"
          src={playerImg}
          alt={activeSong.cover[0]}
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
              <ProgressPrev handleNextPrevious={handleNextPrevious} song={activeSong} />,
              "MAIN_CONTROLS",
              <ProgressNext handleNextPrevious={handleNextPrevious} song={activeSong} />,
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