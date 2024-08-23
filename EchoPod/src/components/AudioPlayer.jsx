import React from 'react';
import useStore from '../store';

function AudioPlayer() {
  const { audioPlaying, audioTrack, stopAudio } = useStore((state) => ({
    audioPlaying: state.audioPlaying,
    audioTrack: state.audioTrack,
    stopAudio: state.stopAudio,
  }));

  if (!audioPlaying || !audioTrack) return null;

  return (
    <div className="audio-player">
      <p>Now Playing: {audioTrack.title}</p>
      <audio src={audioTrack.url} controls autoPlay />
      <button onClick={stopAudio}>Stop</button>
    </div>
  );
}

export default AudioPlayer;