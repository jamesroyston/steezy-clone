import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styled from 'styled-components/macro';
import { getClassById, updateWatched } from '../../api/api';
import Controls from './Controls';

const Container = styled.div`
  background-color: #000;
`;

export default function ClassPage() {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      const response = await getClassById(id);
      setVideoUrl(response.data.videoUrl);
    }
    fetchData();
    return () => {
      setVideoUrl('');
      updateWatched(localStorage.id, Number(localStorage.progress));
      localStorage.id = '';
      localStorage.progress = '';
    };
  }, [id]);

  function handleProgress(e) {
    setProgress(e.played);
    localStorage.id = id;
    localStorage.progress = e.played;
  }

  return (
    <Container>
      <ReactPlayer
        onProgress={handleProgress}
        config={{
          youtube: {
            playerVars: { autoplay: 1, fs: 0, modestbranding: 1 },
          },
        }}
        style={{ overflow: 'hidden' }}
        width="100vw"
        height="100vh"
        controls
        pip={false}
        url={videoUrl}
      />
      {/* <Controls /> */}
    </Container>
  );
}
