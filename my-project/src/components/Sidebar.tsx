import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  posts: { fileName: string; header: string }[];
  activePost: string;
  isLoaded: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, activePost, isLoaded }) => {
  const router = useRouter();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles["sidebar-title"]}>Posts</h2>
      <div
        className={`${styles["sidebar-content"]} ${
          isLoaded && styles.loaded
        }`}
      >
        <ul className={styles["sidebar-list"]}>
          {posts.map((post) => (
            <li
              key={post.fileName}
              className={`${styles["sidebar-item"]} ${
                post.fileName === router.query.name ? styles.active : ""
              }`}
            >
              <Link href={`/posts/${post.fileName.replace(/\.md$/, "")}`}>
                {post.header}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
