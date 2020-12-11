import React, { useContext } from "react";
import styles from "../styles/Form.module.scss";

import Context from "../Context";

const Form = () => {
  //access the props from Context provider stated in Main.js
  const { call_the_api } = useContext(Context);

  return (
    //On submit, call the prop
    <form onSubmit={call_the_api} className={styles.formContainer}>
      {/* City Name */}
      <label className={styles.label}>City Name:</label>
      <input type="text" placeholder="City name..." name="city" />
      <label className={styles.label}>Refresh Interval:</label>
      <input type="number" placeholder="Enter Seconds" name="refresh" />
      {/* Get Weather Button */}
      <button className={styles.submit}>Get Weather</button>
    </form>
  );
};

export default Form;
