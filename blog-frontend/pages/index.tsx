import { GetStaticProps } from "next";
import { getPosts } from "../lib/posts";
import Link from "next/Link";

type Post = {
  id: string;
  title: string;
  slug: string;
  custom_excerpt: string;
  feature_image: string;
  url: string;
};

const Home: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <div className="container">
      <header className={"headerContainer"}>
        <div className={"header"}>
          <h1>Records of Ken</h1>
          <h3>Thoughts about student life, tech and anything </h3>
        </div>
      </header>

      <main className={"main"}>
        <ul className={"navList"}>
          {posts.map((post) => {
            return (
              <li className={`navLink`} key={post.id}>
                <Link href={`/posts/${post.slug}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts: Post[] = await getPosts();

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: { posts },
  };
};
