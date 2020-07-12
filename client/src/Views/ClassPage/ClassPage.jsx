import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styled from 'styled-components/macro';
import { getClassById } from '../../api/api';
import Controls from './Controls';

const Container = styled.div`
  background-color: #000;
`;

export default function ClassPage() {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState('');
  const [progress, setProgress] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await getClassById(id);
      setVideoUrl(response.data.videoUrl);
    }
    fetchData();
    return () => setVideoUrl('');
  }, [id]);

  function handleProgress(e) {
    setProgress(e);
    console.log(e);
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
