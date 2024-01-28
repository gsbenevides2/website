import Link from "next/link";
import styles from "./styles.module.scss";

const BlogHeader: React.FC = () => (
  <div className={styles.header}>
    <Link href="/blog">
      <h1>Blog do Gui</h1>
    </Link>
  </div>
);

export default BlogHeader;
