import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PauseCircleFilled, PlayCircleFilled } from "@ant-design/icons";
import { message } from "antd";
import ArrowDownOutlined from "@ant-design/icons/lib/icons/ArrowDownOutlined";
import { VoicePlayerType } from "./voicePlayer.type";

export const MessageStatus = {
  ready: "ready",
  failed: "failed",
  cancel: "cancel",
  sending: "sending",
  downloadable: "downloadable",
  retry: "retry",
  seen: "seen",
  delete: "deleted",
};

const VoicePlayer: React.FC<VoicePlayerType> = ({
  waveSurfer,
  pauseAll,
  keyName,
  url,
  data,
  status,
  cancel,
  retry,
}) => {
  const elementRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (elementRef && elementRef.current) {
      // eslint-disable-next-line
      // @ts-ignore
      waveSurfer[keyName] = WaveSurfer.create({
        container: elementRef.current,
        barWidth: 1,
        barGap: 1,
        cursorColor: "red",
        cursorWidth: 0,
        height: 50,
        normalize: true,
        partialRender: true,
        pixelRatio: 1,
        progressColor: "#91650e",
        responsive: true,
        waveColor: "#E39F0E",
        backend: "WebAudio",
        closeAudioContext: true,
      });
    }
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     loadSound(data);
  //   } else if (url) {
  //     loadSound(url);
  //   }
  //   setPlayerIsReady();
  //   // eslint-disable-next-line
  // }, [data, url]);

  function setPlayerIsReady() {
    // @ts-ignore
    if (waveSurfer[keyName]) {
      // @ts-ignore
      waveSurfer[keyName].on("ready", function () {
        setLoaded(true);
        setDownloading(false);
        // @ts-ignore
        setDuration(waveSurfer[keyName].getDuration());
      });
      // @ts-ignore
      waveSurfer[keyName].on("finish", function () {
        setIsPlaying(false);
      });
      // @ts-ignore
      waveSurfer[keyName].on("pause", function () {
        setIsPlaying(false);
      });
      // @ts-ignore
      waveSurfer[keyName].on("play", function () {
        setIsPlaying(true);
      });
    }
  }

  function controlPlayPause() {
    if (loaded) {
      // @ts-ignore
      pauseAll(keyName);
      // @ts-ignore
      waveSurfer[keyName].playPause();
    }
  }

  function cancelSend() {
    // @ts-ignore
    cancel();
  }

  function retrySend() {
    // @ts-ignore
    retry();
  }

  function retryDownload() {
    download();
  }

  function download() {
    setDownloading(true);
    if (data) {
      loadSound(data);
    } else if (url) {
      loadSound(url);
    }
  }

  function loadSound(sound: any) {
    if (!sound) {
      message.error("خطایی پیش آمد");
      return false;
    }
    // @ts-ignore

    if (waveSurfer[keyName]) {
      // @ts-ignore

      waveSurfer[keyName].empty();
      if (sound) {
        // @ts-ignore

        waveSurfer[keyName].load(sound);
      }
    }

    setPlayerIsReady();
  }

  return (
    <div className="msg-voice-player">
      {(status === MessageStatus.ready ||
        status === MessageStatus.seen ||
        (status === MessageStatus.downloadable && !downloading && loaded)) && (
        <div className="control-wrapper center-flex" onClick={controlPlayPause}>
          {isPlaying ? (
            <PauseCircleFilled className="control pause" />
          ) : (
            <PlayCircleFilled className="control play" />
          )}
        </div>
      )}
      {status === MessageStatus.sending && (
        <div className="control-wrapper center-flex" onClick={cancelSend}>
          <div className="bg-gradient active center-flex">
            <div className="arrow-wrapper center-flex">
              <div className="icon-cancel" />
            </div>
          </div>
        </div>
      )}
      {status === MessageStatus.failed && (
        <div
          className="control-wrapper center-flex"
          onClick={data ? retrySend : retryDownload}
        >
          <div className="bg-gradient center-flex">
            <div className="arrow-wrapper center-flex">
              <div className="icon-reload-refresh" />
            </div>
          </div>
        </div>
      )}
      {status === MessageStatus.downloadable && !downloading && !loaded && (
        <div className="control-wrapper center-flex" onClick={download}>
          <div className="bg-gradient center-flex">
            <div className="arrow-wrapper center-flex">
              <ArrowDownOutlined />
            </div>
          </div>
        </div>
      )}
      {status === MessageStatus.downloadable && downloading && !loaded && (
        <div className="control-wrapper center-flex">
          <div className="bg-gradient active center-flex">
            <div className="arrow-wrapper center-flex">
              <div className="icon-cancel" />
            </div>
          </div>
        </div>
      )}

      <div className="duration center-flex">
        {duration && duration !== 0 ? (
          <div />
        ) : (
          // <TimeShower time={duration.toFixed(0)} />
          "--:--"
        )}
      </div>
      <div
        key={keyName}
        className={`wave ${!loaded || downloading ? "loading" : ""}`}
        ref={elementRef}
      />
    </div>
  );
};

export default VoicePlayer;
