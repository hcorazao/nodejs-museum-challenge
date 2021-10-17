import React, { useEffect, useRef, useState } from "react";

import Loading from "./componets/Loading";
import ViewPort from "./componets/Viewport";

import { fetchArtworksService } from "./services";

import "./index.css";

const ArkWork = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [artworks, setArtworks] = useState([]);
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [currentArtworkId, setCurrentArtworkId] = useState();
  const artworkIdRef = useRef();
  const intervalRef = useRef();

  useEffect(() => {
    async function fetchArtworks() {
      const response = await fetchArtworksService();
      if (response.status === 200) {
        const artworksIds = response.data.objectIDs;
        setArtworks(artworksIds);
        setCurrentArtworkId(artworksIds[0]);
        setIsLoading(false);
      }
    }

    fetchArtworks();
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      reset();
      setCurrentArtworkId(artworkIdRef.current + 1);
    }

    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  function startCounter(idWithImageAvailable) {
    artworkIdRef.current = idWithImageAvailable;
    setIsActive(true);
  }

  function reset() {
    setIsActive(false);
    setSeconds(10);
  }

  function toggleCounter() {
    setIsActive((s) => !s);
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  console.log(isActive);

  if (!artworks.length) {
    return <p>No artworks to show :(</p>;
  }

  return (
    <div className="container" onClick={toggleCounter}>
      {currentArtworkId && (
        <ViewPort artworkId={currentArtworkId} startCounter={startCounter} isActive={isActive} />
      )}
      <div className="count-down">
        <p>currentArtworkId: {currentArtworkId}</p>
        <p>seconds: {seconds}</p>
      </div>
    </div>
  );
};

export default ArkWork;
