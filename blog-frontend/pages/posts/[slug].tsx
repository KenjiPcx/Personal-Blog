import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
type PostType = {
  title: string;
  url: string;
  slug: string;
  html: string;
  reading_time: number;
  feature_image: string;
};

const { CONTENT_API_KEY, BLOG_URL } = process.env;

const getPostData = async (slug: string) => {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,url,slug,html,reading_time,feature_image`
  ).then((res) => res.json());

  console.log(res);
  return res.posts[0];
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const postData = await getPostData(params.slug as string);
  return {
    props: { postData },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

const Post: React.FC<{ postData: PostType }> = ({ postData }) => {
  const [firstTime, setFirstTime] = useState(true);

  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading</h1>;
  }

  const loadComments = () => {
    setFirstTime(false);

    (window as any).disqus_config = () => {
      this.page.url = window.location.href;
      this.page.identifier = postData.slug;
    };

    const script = document.createElement("script");
    script.src = "https://kenji-blogs.disqus.com/embed.js";
    script.setAttribute("data-timestamp", Date.now().toString());
    document.body.appendChild(script);
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <a>Back</a>
      </Link>
      <h1>{postData.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postData.html }}></div>

      {firstTime && <p onClick={loadComments}>Load Comments</p>}

      <div id="disqus_thread"></div>
    </div>
  );
};

export default Post;
