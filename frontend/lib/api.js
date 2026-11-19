const API_URL = process.env.API_URL;

export async function getAllPosts() {
  const response = await fetch(`${API_URL}/api/posts`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch posts. Status: ${response.status}. URL: ${API_URL}/api/posts`
    );
  }

  const result = await response.json();
  return result.data;
}

export async function getPostBySlug(slug) {
  const response = await fetch(`${API_URL}/api/posts/${slug}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch post. Status: ${response.status}. URL: ${API_URL}/api/posts/${slug}`
    );
  }

  const result = await response.json();
  return result.data;
}