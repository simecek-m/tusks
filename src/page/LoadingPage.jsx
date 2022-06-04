import styles from "page/LoadingPage.module.sass";

export default function LoadingPage() {
  return (
    <div id={styles.layout}>
      <img src="/logo.svg" alt="logo" />
      <h1>Loading</h1>
    </div>
  );
}
