//import logo from './logo.svg';
//import './App.css';

import { useState, useEffect, MouseEvent } from 'react';
import VideoPlayer from './VideoPlayer';

interface VideoProps {
  onNext: () => void;
}

const Video: React.FC<VideoProps> = ({ onNext }) => {
  const [videoId, setVideoId] = useState('cdn');
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    // Call playVideo function when the component mounts
    playVideo(null, videoId);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  function playVideo(e: MouseEvent<HTMLButtonElement> | null, videoId: string) {
    if (e) e.preventDefault();
    setVideoId(videoId);
    setShowNextButton(true);
  }

  return (
    <div className="App">
      <VideoPlayer videoId={videoId} />
      <br />
      {showNextButton && <button type="button" onClick={onNext}>NEXT</button>}
    </div>
  );
}

export default Video;
