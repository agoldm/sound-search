// Import tracks from Mixcloud
export async function searchMixcloud(query, offset = 0, limit = 6) {
  const url = `https://api.mixcloud.com/search/?q=${encodeURIComponent(query)}&type=cloudcast&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data; // array of results
  } catch (error) {
    console.error("Mixcloud API error:", error);
    return [];
  }
}