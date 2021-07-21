import React from "react";
import Image from "next/image";
import Link from "next/Link";

function PostCard({ post }: any) {
  return (
    <div className="card">
      <Link href={`/posts/${post.slug}`}>
        <a>
          {post.title}
        </a>
      </Link>
    </div>
  );
}

export default PostCard;
