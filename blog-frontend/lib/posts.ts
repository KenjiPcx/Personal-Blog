import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: process.env.BLOG_URL,
  key: process.env.CONTENT_API_KEY,
  version: "v3",
});

export async function getPosts() {
  return await api.posts
    .browse({
      limit: "all",
    })
    .catch(console.log);
}

export async function getSinglePost(postSlug: string) {
  return await api.posts
    .read({
      slug: postSlug,
    })
    .catch(console.log);
}
