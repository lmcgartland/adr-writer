import { getPostBySlug, getAllPosts } from "../../lib/api";

export default (req, res) => {
  const allRecords = getAllPosts(["slug"]);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ allRecords }));
};
