import Link from "next/link";
import styles from "./styles.module.css";

const BlogHeader: React.FC = () => (
  <div className={styles.header}>
    <Link href="/blog" passHref legacyBehavior>
      <h1 className={styles.headerTitle}>Blog do Gui</h1>
    </Link>
  </div>
);

export default BlogHeader;
