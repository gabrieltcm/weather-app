import React from "react";
import styles from "../styles/Header.module.scss";

export default function Header() {
  return (
    <React.Fragment>
      <h1 className={styles.header}>Weather Condition App</h1>
    </React.Fragment>
  );
}
