import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GetStaticProps } from "next";
import Link from "next/link";

const { CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  title: string;
  slug: string;
  custom_excerpt: string;
  feature_image: string;
  url: string;
};

const getPosts = async () => {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,url,slug,custom_excerpt,reading_time,feature_image`
  ).then((res) => res.json());

  return res.posts;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts: Post[] = await getPosts();
  return {
    props: { posts },
  };
};

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <h1>Hello to my blog</h1>
      <ul>
        {posts.map((post, key) => {
          return (
            <li key={key}>
              <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
