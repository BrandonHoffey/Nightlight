// Tenor Api Fetch
const apiKey = "AIzaSyAsjOcDFXxslfZDJrh-uLsUqn-3x0rofm8";

const tenorApi = async (query) => {
  try {
    const searchQuery = query;
    const apiUrl = `https://tenor.googleapis.com/v2/search?q=${searchQuery}&key=${apiKey}&limit=22`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
};

export { tenorApi };
