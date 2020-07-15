import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styled from 'styled-components/macro';
import { getClassById, updateWatched } from '../../api/api';
import useSessionCheck from '../../hooks/useSessionCheck';

const Container = styled.div`
  background-color: #000;
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
`;

const TimeRemaining = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  color: white;
`;

export default function ClassPage() {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [duration, setDuration] = useState(0);
  const [displayTimeLeft, setDisplayTimeleft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const player = useRef();

  // time tracking initialization
  const start = performance.now();
  let end;

  // initialize localStorage progress for watching in useEffect below
  localStorage.start = 0;
  localStorage.progress = 0;

  // hook for watching changes in isPlaying and creates my ranges
  const rangeRef = useRef({
    ranges: [],
    start: 0,
  });

  useSessionCheck();

  useEffect(() => {
    if (isPlaying) {
      rangeRef.current.start = isNaN(player.current.getCurrentTime())
        ? 0
        : player.current.getCurrentTime() / duration;
    }
    if (!isPlaying) {
      rangeRef.current.ranges.push({
        start: rangeRef.current.start,
        end: player.current.getCurrentTime() / duration,
      });
    }
  }, [duration, isPlaying]);

  useEffect(() => {
    async function fetchData() {
      const response = await getClassById(id);
      setVideoUrl(response.data.videoUrl);
    }

    fetchData();

    return () => {
      // get end time and diff for total time on page
      end = performance.now();
      const totalTime = (end - start) / 1000;

      setVideoUrl('');
      updateWatched(
        id,
        Number(localStorage.progress),
        Number(localStorage.timestampWatched),
        Math.round(totalTime),
        rangeRef.current.ranges,
      );
      localStorage.id = '';
      localStorage.progress = '';
      localStorage.timestampWatched = '';
    };
  }, [id]);

  function handleProgress(time) {
    // handle time left display
    const timeLeft = Math.floor(duration - time.playedSeconds);
    setDisplayTimeleft(timeLeft);

    // handle last timestamp
    // 0.5 seconds should be considered a full second
    localStorage.timestampWatched = Math.ceil(time.playedSeconds);

    // handle time percentage and id storage for updating on the backend on exit of class
    localStorage.id = id;
    localStorage.progress = time.played;
  }

  return (
    <Container>
      <ReactPlayer
        ref={player}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onProgress={handleProgress}
        config={{
          youtube: {
            playerVars: { autoplay: 1, fs: 0, modestbranding: 1 },
          },
        }}
        onDuration={time => setDuration(time)}
        progressInterval={1000}
        style={{ overflow: 'hidden' }}
        width="100vw"
        height="95vh"
        controls
        pip={false}
        url={videoUrl}
      />
      <TimeRemaining>{displayTimeLeft} seconds remaining</TimeRemaining>
    </Container>
  );
}
