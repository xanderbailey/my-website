import Link from "next/link";
import React from "react";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={`${styles.navbar} ${styles.navbar}`}>
      <div className={`${styles.container}`}>
        <div className="flex items-start">
          <Link href="/" className={`${styles.link}`}>
              Home
          </Link>
          <Link href="/posts/pivot" className={`${styles.link}`}>
              Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
