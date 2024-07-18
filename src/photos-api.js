import axios from "axios";

axios.defaults.baseURL = 'https://api.unsplash.com'
export const fetchPhotos = async (query, currentPage) => {
  const response = await axios.get("/search/photos",
    {
    params: {
        query,
        client_id: 'w4BqlWAY-rBQ0eMGKqctvUGuMqzaVv8BR_OQAFUTFTo',
        page: currentPage,
        per_page: 10
    }}
    )
    return response.data.results
}