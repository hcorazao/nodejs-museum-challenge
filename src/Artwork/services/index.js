import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function fetchArtworksService() {
  try {
    const response = await axios({
      url: `${baseUrl}/objects`,
      method: "GET",
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchArtworkService(artworkId) {
  try {
    const response = await axios({
      url: `${baseUrl}/objects/${artworkId}`,
      method: "GET",
    });

    return response;
  } catch (error) {
    return error;
  }
}

export async function getArtworkService(artworkId) {
  let stop = false;
  let callCounter = artworkId;
  let artwork = null;
  const MAX_CALLS = 100;

  while (!stop && callCounter <= MAX_CALLS) {
    try {
      const response = await fetchArtworkService(callCounter);
      if (response.status === 200) {
        const data = response.data;
        if (data.primaryImage !== "") {
          artwork = data;
          stop = true;
        } else {
          callCounter++;
        }
      }
    } catch (error) {
      throw new Error("error calling endpoint");
    }
  }

  if (callCounter > MAX_CALLS) {
    throw new Error("this api sucks >:v");
  }

  return { idWithImageAvailable: callCounter, artwork };
}
