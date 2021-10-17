import React, { useEffect, useRef, useState } from "react";

import { getArtworkService } from "../../services";

import "./index.css";

const ViewPort = React.memo(({ artworkId, startCounter, isActive }) => {
  const [primaryImage, setPrimaryImage] = useState("");
  const isFirstLoading = useRef(true);

  useEffect(() => {
    async function fetchArtwork() {
      console.log("fetchArtwork", artworkId);
      try {
        const { idWithImageAvailable, artwork } = await getArtworkService(
          artworkId
        );
        setPrimaryImage(artwork.primaryImage);
        startCounter(idWithImageAvailable);
      } catch (error) {
        console.log(error);
      }
    }
    if (isActive || isFirstLoading.current) {
      fetchArtwork();
      isFirstLoading.current = false;
    }
  }, [artworkId, isActive, startCounter]);

  return (
    <div className="viewport">
      <img src={primaryImage} alt="" />
    </div>
  );
});

export default ViewPort;
