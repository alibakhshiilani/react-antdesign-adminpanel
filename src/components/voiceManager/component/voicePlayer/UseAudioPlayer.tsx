import React, { useEffect, useState } from "react";

const UseAudioPlayer = (url: any) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState<boolean>(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line react/button-has-type */}
      <button
        // @ts-ignore
        onClick={toggle}
      >
        {playing ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default UseAudioPlayer;
