import styles from "page/NoneListSelectedPage.module.sass";

export default function NoneListSelectedPage() {
  return (
    <div id={styles.layout}>
      <h1>None</h1>
      <p>
        you have to pick todo list or{" "}
        <span className={styles.link}>create</span> new one
      </p>
    </div>
  );
}
