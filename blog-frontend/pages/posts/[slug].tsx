import { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/Link";
import { useRouter } from "next/router";
import { getPosts, getSinglePost } from "../../lib/posts";

type PostType = {
  title: string;
  url: string;
  slug: string;
  html: string;
  reading_time: number;
  feature_image: string;
};

const Post: React.FC<{ postData: PostType }> = ({ postData }) => {
  const [firstTime, setFirstTime] = useState(true);

  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading</h1>;
  }

  const loadComments = () => {
    setFirstTime(false);

    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = postData.slug;
    };

    const script = document.createElement("script");
    script.src = "https://kenji-blogs.disqus.com/embed.js";
    script.setAttribute("data-timestamp", Date.now().toString());
    document.body.appendChild(script);
  };

  return (
    <div className={"container"}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  const paths = posts.map((post: PostType) => ({
    params: { slug: post.slug },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const postData = await getSinglePost(context.params.slug);

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: { postData },
  };
};
