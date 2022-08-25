const apiEndpoints = {
  episode: "/episode",
  character: "/character",
  location: "/location",
};

export const charakterUrl = `${process.env.REACT_APP_API_URL}${apiEndpoints.character}`;
export const episodeUrl = `${process.env.REACT_APP_API_URL}${apiEndpoints.episode}`;
export const locationUrl = `${process.env.REACT_APP_API_URL}${apiEndpoints.location}`;
