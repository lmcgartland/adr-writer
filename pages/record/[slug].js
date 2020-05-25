import { useRouter } from "next/router";
import { Text } from "@chakra-ui/core";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import Markdown from "react-markdown";
import MDComponents from "../../components/MDComponents";

export default function Record({ post, morePosts }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <Markdown renderers={MDComponents} source={post.content} />
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage"
  ]);

  return {
    props: {
      post
    },
    unstable_revalidate: 1
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "content"]);

  return {
    paths: posts.map(posts => {
      return {
        params: {
          slug: posts.slug
        }
      };
    }),
    fallback: true
  };
}
