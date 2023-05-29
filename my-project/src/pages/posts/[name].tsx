import React, { useEffect, useState } from "react";
import styles from "../posts.module.css";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import path from "path";
import fs from "fs";
import { useRouter } from "next/router";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { getPostData } from "../api/post/[slug]";

const PostPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
}) => {
  const [posts, setPosts] = useState<{ fileName: string; header: string }[]>(
    []
  );

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const router = useRouter();

  const selectedPost = posts.find(
    (post) =>
      post.fileName === router.query.name || post.fileName === "select-a-post"
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts-headers");
        const data = await response.json();
        setPosts(data);
        setIsLoaded(true); 
      } catch (error) {
        console.error("Error fetching posts headers:", error);
        setIsLoaded(true); 
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="background">
     <Navigation/>
      <div className={styles.container}>
        <Sidebar posts={posts} activePost={router.query.name as string} isLoaded={isLoaded}/>
        <article className={`${styles.post} ${isLoaded && styles.loaded}`}>
          <div className={styles.content}>
            <MarkdownRenderer markdown={content} />
          </div>
        </article>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join("./content/posts");
  const fileNames = fs.readdirSync(postsDirectory);
  const names = fileNames.map((fileName) => fileName.replace(/\.md$/, ""));
  const paths = names.map((name) => ({ params: { name } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params?.name as string;
  const {content} = getPostData(name)
  return {
      props: {
        content,
      },
  };
};

export default PostPage;
